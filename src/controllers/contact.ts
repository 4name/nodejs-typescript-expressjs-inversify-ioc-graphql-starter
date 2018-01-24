import { Request, Response } from 'express';

/**
 * GET /contact
 * Contact form page.
 */
export const getContact = (req: Request, res: Response) => {
    res.render('contact', {
        title: 'Contact'
    });
};

/**
 * POST /contact
 * Send a contact form via Nodemailer.
 */
export const postContact = (req: Request, res: Response) => {
    req.assert('name', 'Name cannot be blank').notEmpty();
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('message', 'Message cannot be blank').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/contact');
    }

    req.flash('success', {msg: 'Email has been sent successfully!'});
    res.redirect('/contact');
};
