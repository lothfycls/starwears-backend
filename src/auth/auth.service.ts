import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import {  CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Tokens } from './types';
import * as bcrypt from 'bcrypt';


const nodemailer= require("nodemailer");
const sendEmail= (toEmail:string,subject:string,body:string)=>{
  return new Promise((resolve,reject)=>{
    var transporter = nodemailer.createTransport({
      service:'gmail',
      auth:{
        user:'developer@big-bang.ae',
        pass:'mwkdhqwjkwpopmjb', //wwvgbfmevevvyxjt
      }
    })
    const mail_configs={
      from:'developer@big-bang.ae',
      to:toEmail,
      subject:subject,
      text:body,
    }

    
    transporter.sendMail(mail_configs,function(err,info){
      if(err){
       
        return reject({message:"An error has occured DURING execution"})
      }
     
      return resolve({message:'Email sent Succefully'})
    })

  });
}

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  // HELPERS
  async hashData(data: string) {
    return await bcrypt.hash(data, 10);
  }



  async getTokens(
    userId: number,
    email: string,
  ): Promise<Tokens> {
    const at = await this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'at-secret key',
          expiresIn: 60 * 50,
        },
      );
    return {
      access_token: at,
      customer_id: userId,
    };
  }

  async getTokenAt(
    userId: number,
    email: string,
  ) {
    const at =await this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'at-secret key',
          expiresIn: 60 * 50*50,
        },
      
    );
    return [at,userId];
  }

  async createNewUser(dto: CreateAuthDto){
    const hash = await this.hashData(dto.password);

    
    const ExistCustomer =
      (await this.prisma.client.findUnique({
        where: {
          email: dto.email,
        },
      })) ;

    if (ExistCustomer)
      throw new ForbiddenException('email or phone num already exist');
    const newCustomer = await this.prisma.client.create({
      data: {
        email: dto.email,
        password: hash,
      },
    });

    const tokens = await this.getTokenAt(
      newCustomer.id,
      newCustomer.email,
    );
    
    // const newNotification=await this.prisma.notifications.create({
    //   data:{
    //     message:"New Customer joined the website, check it now, with the email :" +newCustomer.email,
    //     Type:"NewCustomer",
    //   }
    // })
    return tokens;
  }

  async login(dto: CreateAuthDto){
    const client = await this.prisma.client.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!client) throw new ForbiddenException('user not found');

    const passwordMatches = await bcrypt.compare(
      dto.password,
      client.password,
    );

    if (!passwordMatches) throw new ForbiddenException("password dosn't match");

    const tokens = await this.getTokenAt(
      client.id,
      client.email,
    );
    return tokens;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }


  async createNewUserDash(dto:CreateAuthDto){
    const hash = await this.hashData(dto.password);

    const ExistCustomer =
      (await this.prisma.admin.findUnique({
        where: {
          email: dto.email,
        },
      }));

    if (ExistCustomer)
      throw new ForbiddenException('email already exist');
    const newUser = await this.prisma.admin.create({
      data: {
        email:dto.email,
        password: hash,
      }
    });
    

    const token= await this.getTokens(
      newUser.id,
      newUser.email
    );
    // const newNotification=await this.prisma.notifications.create({
    //   data:{
    //     message:"New user added to the list of admins, check it now, with the email :" +newUser.email,
    //     Type:"Normal",
    //   }
    // })
    
    return token;
  }
  async loginDash(dto:CreateAuthDto){
    const admin = await this.prisma.admin.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!admin) throw new ForbiddenException('admin not found');

    const passwordMatches = await bcrypt.compare(
      dto.password,
      admin.password,
    );

    if (!passwordMatches) throw new ForbiddenException("password dosn't match");

    const token = await this.getTokens(
      admin.id,
      admin.email,
    );
    
    return token;
  }

  verifyEmail(){

  }

  sendVerificationEmail(){}

}
