import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { Question } from "./question.dto";
import { AuthGuard } from '@nestjs/passport';

@Controller('contact')
export class ContactController {
    constructor(private contactService: ContactService) {}

    @Post('/send-question')
    @UseGuards(AuthGuard('jwt'))
    async signIn(@Body() question: Question) {
        return this.contactService.sendQuestion(question);
    }
}
