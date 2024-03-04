import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Question } from "./question.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity';
@Injectable()
export class ContactService {
  constructor(
    private mailerService: MailerService,
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}

  async sendEmail(to: string, subject: string, content: string): Promise<void> {
    await this.mailerService.sendMail({
      to,
      subject,
      html: content,
    });
  }

  async sendQuestion(question: Question): Promise<void> {
    const { email, text } = question;

    const contact = new Contact();
    contact.email = email;
    contact.message = text;
    await this.contactRepository.save(contact);

    await this.sendEmail(email, "New question", text);
  }
}