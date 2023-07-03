import moment from 'moment'

const InstanceMoment = (date) => date !== undefined ? moment(date) : moment()
const formatDate = (date, formatInput, formatOuput) => moment(date, formatInput).format(formatOuput)
const getYear = (momentCurrent) => (momentCurrent !== undefined && momentCurrent !== null)? momentCurrent.get('year') : moment().get('year');
const getMonth = (momentCurrent) => (momentCurrent !== undefined && momentCurrent !== null)? momentCurrent.get('month') : moment().get('month');
const getDate = (momentCurrent) => (momentCurrent !== undefined && momentCurrent !== null)? momentCurrent.get('date') : moment().get('date')
const daysMonth = (momentCurrent) => (momentCurrent !== undefined && momentCurrent !== null)? momentCurrent.daysInMonth() : moment().daysInMonth()
const getHour = (time, format) => moment(time, format).format("hh");
const getMinute = (time, format) => moment(time, format).format("mm");
const getSecond = () => moment().format("ss");
const getMeridiano = (time, format) => moment(time, format).format("a");
const addMonth = (number = 1, momentCurrent = moment()) => momentCurrent.add(number, 'months');
const subtractMonth = (number = 1) => moment().subtract(number, 'months');
const addYear = (number = 1) => moment().add(number, 'years');
const subtractYear = (number = 1) => moment().subtract(number, 'years');

const setYear = (year) => moment().year(year);

const dayWeekInit = (momentCurrent = moment()) => {
    const data = `${getYear(momentCurrent)}-${getMonth(momentCurrent) + 1}-01`
    return moment(data).days()
} 

const letterMonth = (languaje = 'es', momentCurrent = moment()) => {   
    const month = {
        es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }

    const monthCurrent = getMonth(momentCurrent)

    return month[languaje][monthCurrent]
}

const letterDays = (languaje = 'es', size = 'long') => {
    const days = {
        es: {
            long: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            small: ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA']
        },
        en: {
            long: ['Sunday ', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            small: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
        }
    }    
    console.log()
    return days[languaje][size]
}

const getDayWeek = (momentCurrent = moment()) => {
    const getDay = letterDays()
    return getDay[momentCurrent.days()]
}

const dayWeekStart = (momentCurrent)=> {
    if(momentCurrent !== undefined || momentCurrent !== null) {
        const data = `${momentCurrent.get('year')}-${momentCurrent.get('month') + 1}-01`
        return moment(data).days()
    }    

    return dayWeekInit()
}

const validateMoment = (time, format) => moment(time, format).format(format);



export {
    getYear,
    getMonth,
    getDate,
    daysMonth,
    letterMonth,
    dayWeekInit,
    letterDays,
    getDayWeek,
    dayWeekStart,
    addMonth,
    subtractMonth,
    addYear,
    subtractYear,
    setYear,

    getHour,
    getMinute,
    getSecond,
    getMeridiano,
    validateMoment,
    InstanceMoment,
    formatDate
}