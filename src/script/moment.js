import moment from 'moment'

const getYear = (momentCurrent) => (momentCurrent !== undefined && momentCurrent !== null)? momentCurrent.get('year') : moment().get('year');
const getMonth = (momentCurrent) => (momentCurrent !== undefined && momentCurrent !== null)? momentCurrent.get('month') : moment().get('month');
const getDate = () => moment().get('date')
const daysMonth = (momentCurrent) => (momentCurrent !== undefined && momentCurrent !== null)? momentCurrent.daysInMonth() : moment().daysInMonth()
const getHour = (time, format) => moment(time, format).format("hh");
const getMinute = (time, format) => moment(time, format).format("mm");
const getSecond = () => moment().format("ss");
const getMeridiano = (time, format) => moment(time, format).format("a");
const addMonth = (number = 1) => moment().add(number, 'months');
const subtractMonth = (number = 1) => moment().subtract(number, 'months');
const addYear = (number = 1) => moment().add(number, 'years');
const subtractYear = (number = 1) => moment().subtract(number, 'years');

const setYear = (year) => moment().year(year);

const dayWeekInit = () => {
    const data = `${getYear()}-${getMonth() + 1}-01`
    return moment(data).days()
} 

const letterMonth = (languaje = 'es', momentCurrent) => {   
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

const getDayWeek = () => {
    const getDay = letterDays()
    return getDay[moment().days()]
}

const dayWeekStart = (momentCurrent)=> {
    if(momentCurrent !== undefined || momentCurrent !== null) {
        const data = `${momentCurrent.get('year')}-${momentCurrent.get('month') + 1}-01`
        return moment(data).days()
    }    

    return dayWeekInit()
}



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
    getMeridiano
}