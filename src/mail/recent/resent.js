import {Injectable} from '@nestjs/common'
import { Resend } from 'resend';

@Injectable()
export class MailService{

    

    constructor(){
        this.resend = new Resend('re_g1hx8Mtq_Muu3VrishxSKZcc5bTtQZfqm') ; //Usar clave de Api de Resend ...ummmm
    }
    async sendMail(){
        try{
            const {data , error} = await this.resend.emails.send({
                from: '.....', 
                to: ['eduardomarcelomazzolafernandez@gmail.com'] , 
                subject: 'hello world' ,
                html: '<strong>it works!</strong>',
            })  ; 
            if(error){
                throw new Error(error.message) ;  
            }
            return data ; 
        }catch(error){
            throw new Error(`Failed to send mail:${error.message}`) ; 
        }
    }
}