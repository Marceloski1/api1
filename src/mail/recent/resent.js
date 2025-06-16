import {Injectable} from '@nestjs/common'
import { Resend } from 'resend';

@Injectable()
export class MailService{

    const resend = new Resend('re_E94WXrgj_HxRG5R7d9rYo3gkZ44j8ba6Y');

    constructor(){
        this.resend = new Resend('re_123456789') ; //Usar clave de Api de Resend ...ummmm
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