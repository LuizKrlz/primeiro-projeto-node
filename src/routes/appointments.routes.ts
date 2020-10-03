import { Router } from "express";
import { startOfHour, parseISO } from "date-fns";

import AppointmentsRepository from "../repositories/AppointmentsRepository";

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post("/", (request, response) => {
    const { provider, date } = request.body;

    /**
     * Transform hour to init
     */
    const parsedDate = startOfHour(parseISO(date));

    if (appointmentsRepository.findByDate(parsedDate)) {
        return response
            .status(400)
            .json({ error: "This appointment is already booked" });
    }

    const appointment = appointmentsRepository.create(provider, parsedDate);

    return response.json(appointment);
});

export default appointmentsRouter;
