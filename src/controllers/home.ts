import { Request, Response } from 'express';
import { myContainer } from '../config/inversify.config';
import { Warrior } from '../models/interfaces';
import { TYPES } from '../models/types';

/**
 * GET /
 * Home page.
 */
export const index = (req: Request, res: Response) => {
    const ninja = myContainer.get<Warrior>(TYPES.Warrior);

    res.render('home', {
        title: `Home ${ninja.fight()} ${ninja.sneak()}`
    });
};
