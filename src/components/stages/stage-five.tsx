import z from "zod";
import { ValidationSchema } from "@/components/form";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormRow } from "@/components/form-row";

export const stageFiveSchema = z
  .object({
    birthday: z
      .string()
      .min(1, { message: "Your horoscope must match your birthday" }),
    horoscope: z
      .string()
      .min(1, { message: "Your horoscope must match your birthday" }),
    weekday: z
      .string()
      .min(1, { message: "Weekday must match the weekday you were born" }),
  })
  .refine(
    (data) => {
      console.log(data.horoscope);
      const findSign = (date: Date) => {
        const days = [21, 20, 21, 21, 22, 22, 23, 24, 24, 24, 23, 22];
        const signs = [
          "Aquarius",
          "Pisces",
          "Aries",
          "Taurus",
          "Gemini",
          "Cancer",
          "Leo",
          "Virgo",
          "Libra",
          "Scorpio",
          "Sagittarius",
          "Capricorn",
        ];
        let month = date.getMonth();
        const day = date.getDate();
        if (month == 0 && day <= 20) {
          month = 11;
        } else if (day < days[month]) {
          month--;
        }
        return signs[month];
      };
      return (
        findSign(new Date(data.birthday)).toLocaleLowerCase() ===
        data.horoscope.toLocaleLowerCase()
      );
    },
    {
      path: ["horoscope"],
      message: "Your horoscope must match your birthday.",
    },
  )
  .refine(
    (data) => {
      console.log(data.weekday);
      const isWeekdayCorrect = (date: Date) => {
        const weekdays = [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ];
        return weekdays[date.getDay() - 1];
      };
      return (
        isWeekdayCorrect(new Date(data.birthday)).toLocaleLowerCase() ===
        data.weekday.toLocaleLowerCase()
      );
    },
    {
      path: ["weekday"],
      message: "Weekday must match the weekday you were born",
    },
  );

export function StageFive({
  register,
  errors,
}: {
  register: UseFormRegister<ValidationSchema>;
  errors: FieldErrors<ValidationSchema>;
}) {
  return (
    <>
      <FormRow
        id="time"
        label="Your birthday"
        inputProps={{
          type: "datetime-local",
          id: "date",
          placeholder: "Your birthday",
          ...register("birthday", { required: true }),
        }}
      />
      <FormRow
        id="horoscope"
        label="Your horoscope"
        errors={errors.horoscope}
        inputProps={{
          id: "horoscope",
          placeholder: "Horoscope",
          ...register("horoscope", { required: true }),
        }}
      />
      <FormRow
        id="weekday"
        label="Weekday you were born"
        errors={errors.weekday}
        inputProps={{
          id: "weekday",
          placeholder: "Weekday",
          ...register("weekday", { required: true }),
        }}
      />
    </>
  );
}
