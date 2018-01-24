import { NextFunction, Request, Response } from 'express';

export const getFileUpload = (req: Request, res: Response, next: NextFunction) => {
    res.render('upload', {
        title: 'File Upload'
    });
};

export const postFileUpload = (req: Request, res: Response, next: NextFunction) => {
    req.flash('success', {msg: 'File was uploaded successfully.'});
    res.redirect('/upload');
};
