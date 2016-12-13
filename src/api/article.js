import { Router } from 'express';

import {Article} from '../models';

const articleRouter = new Router();

articleRouter.get('/', (req, res) => {
  Article.find({}).exec((err, articles) => {
    res.json(articles);
  });
});

articleRouter.get('/:id', (req, res) => {
  Article.findOne({ _id: req.params.id }).exec((err, article) => {
    res.json(article);
  });
});

articleRouter.post('/', (req, res) => {
  Article.create(req.body).then((err, article) => {
    res.json(article);
  });
});

articleRouter.put('/:id', (req, res) => {
  Article.update({ _id: req.params.id }, req.body).exec((err, article) => {
    res.json(article);
  });
});

articleRouter.delete('/:id', (req, res) => {
  Article.remove({ _id: req.params.id }).exec((err) => {
    res.json({});
  });
});

export default articleRouter;
