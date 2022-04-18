var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
const adminRouter = require('./routes/adminRoute');
const firmRouter = require('./routes/firmRoute');
const estateRouter = require('./routes/estateRoute');
const constructionRouter = require('./routes/constructionRoute');
const equipmentRouter = require('./routes/equipmentRoute');
const firmEquipmentRouter = require('./routes/firmEquipmentRoute');
const opinionRouter = require('./routes/opinionRoute');

const firmApiRouter = require('./routes/api/FirmApiRoute');
const estateApiRouter = require('./routes/api/EstateApiRoute');
const constructionApiRouter = require('./routes/api/ConstructionApiRoute');
const equipmentApiRouter = require('./routes/api/EquipmentApiRoute');
const firmEquipmentApiRouter = require('./routes/api/FirmEquipmentApiRoute');


const i18n = require('i18n');
i18n.configure({
  locales: ['pl', 'en'], // języki dostępne w aplikacji. Dla każdego z nich należy utworzyć osobny słownik
  directory: path.join(__dirname, 'locales'), // ścieżka do katalogu, w którym znajdują się słowniki
  objectNotation: true, // umożliwia korzstanie z zagnieżdżonych kluczy w notacji obiektowej
  cookie: 'acme-hr-lang', //nazwa cookies, które nasza aplikacja będzie wykorzystywać do przechowania informacji o języku aktualnie wybranym przez użytkownika
});



const session = require('express-session');
const authUtils = require("./util/authUtils");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser('secret'));
app.use(i18n.init);


app.use(session({
  secret: 'my_secret_password',
  resave: false
}));

app.use((req, res, next) => {
  const loggedUser = req.session.loggedUser;
  const admin = req.session.admin;

  res.locals.admin = admin;
  res.locals.loggedUser = loggedUser;

  if (!res.locals.loginError){
    res.locals.loginError = undefined;
  }
  next();
});

app.use((req, res, next) => {
  if(!res.locals.lang) {
    const currentLang = req.cookies['acme-hr-lang'];
    res.locals.lang = currentLang;
  }
  next();
});


app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/firms', firmRouter);
app.use('/estates', estateRouter);
app.use('/constructions', constructionRouter);
app.use('/equipments', equipmentRouter);
app.use('/firmEquipments', firmEquipmentRouter);
app.use('/opinions', opinionRouter);

app.use('/api/firms', firmApiRouter);
app.use('/api/estates', estateApiRouter);
app.use('/api/constructions', constructionApiRouter);
app.use('/api/equipments', equipmentApiRouter);
app.use('/api/firmEquipments', firmEquipmentApiRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
