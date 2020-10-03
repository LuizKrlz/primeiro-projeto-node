import { Router } from "express";
import { uuid } from "uuidv4";
import { startOfHour, parseISO, isEqual } from "date-fns";

const appointmentsRouter = Router();

interface Appointment {
    id: string;
    provider: string;
    date: Date;
}

const appointments: Appointment[] = [];

appointmentsRouter.post("/", (request, response) => {
    const { provider, date } = request.body;

    /**
     * Transform hour to init
     */
    const parsedDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = appointments.find((appointment) =>
        isEqual(parsedDate, appointment.date)
    );

    if (findAppointmentInSameDate) {
        return response
            .status(400)
            .json({ error: "This appointment is already booked" });
    }

    const appointment = {
        id: uuid(),
        date: parsedDate,
        provider,
    };

    appointments.push(appointment);

    return response.json(appointment);
});

export default appointmentsRouter;
