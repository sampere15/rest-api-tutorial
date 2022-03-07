import logger from "pino";  // json logger
import dayjs from "dayjs";  // Formateador de fecha

const log = logger({
    prettyPrint: true,
    base: {
        pid: false,
    },
    timestamp: () => `"time":"${dayjs().format('HH:mm:ss')}"`
});

export default log;