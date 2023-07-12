import { useEffect } from "react";
import z from "zod";
import { ValidationSchema } from "@/components/form";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormRow } from "@/components/form-row";

const stageFields = z.object({
  birthday: z
    .string()
    .min(1, { message: "Your horoscope must match your birthday" }),
  horoscope: z
    .string()
    .min(1, { message: "Your horoscope must match your birthday" }),
  chineseHoroscope: z
    .string()
    .min(1, { message: "Your Chinese horoscope must match your birthday" }),
  weekday: z
    .string()
    .min(1, { message: "Weekday must match the weekday you were born" }),
});

export const stageFiveSchema = stageFields
  .refine(
    (data) => {
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
      function findChineseSign(date: Date) {
        switch (date.getFullYear() % 12) {
          case 0:
            return "Monkey";
            break;
          case 1:
            return "Rooster";
            break;
          case 2:
            return "Dog";
            break;
          case 3:
            return "Pig";
            break;
          case 4:
            return "Rat";
            break;
          case 5:
            return "Ox";
            break;
          case 6:
            return "Tiger";
            break;
          case 7:
            return "Rabbit";
            break;
          case 8:
            return "Dragon";
            break;
          case 9:
            return "Snake";
            break;
          case 10:
            return "Horse";
            break;
          case 11:
            return "Sheep";
            break;
          default:
            return "Error";
            break;
        }
      }
      return (
        findChineseSign(new Date(data.birthday)).toLocaleLowerCase() ===
        data.chineseHoroscope.toLocaleLowerCase()
      );
    },
    {
      path: ["chinesehoroscope"],
      message: "Your chinese horoscope must match your birthday.",
    },
  )
  .refine(
    (data) => {
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

const stageSchemaKeys = Object.keys(stageFields.shape);

export function StageFive({
  touchedFields,
  register,
  errors,
  onPassStage,
}: {
  touchedFields: Partial<Readonly<{ [K in keyof ValidationSchema]?: boolean }>>;
  register: UseFormRegister<ValidationSchema>;
  errors: FieldErrors<ValidationSchema>;
  onPassStage: () => void;
}) {
  useEffect(() => {
    const hasStageErrors = stageSchemaKeys.some(
      (key) => !!errors[key as keyof typeof errors],
    );
    const hasTouchedAllStageValues = stageSchemaKeys.every(
      (key) => !!touchedFields[key as keyof typeof touchedFields],
    );

    if (hasTouchedAllStageValues && !hasStageErrors) {
      onPassStage();
    }
  }, [errors, touchedFields, onPassStage]);

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
        id="chineseHoroscope"
        label="Your Chinese horoscope"
        errors={errors.chineseHoroscope}
        inputProps={{
          id: "chineseHoroscope",
          placeholder: "Chinese horoscope",
          ...register("chineseHoroscope", { required: true }),
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
