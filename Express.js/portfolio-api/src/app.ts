import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { router as indexRouter } from './routes/index';
import cors from 'cors';

const app = express();

// view engine setup ないとエラー
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: process.env.CORS_ORIGIN, //アクセス許可するオリジン
  credentials: true, 
  optionsSuccessStatus: 200
}))

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
interface ErrorWithStatus extends Error {
  status?: number;
}

// error handler
app.use(( err: ErrorWithStatus, req: Request, res: Response, next: NextFunction ) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
