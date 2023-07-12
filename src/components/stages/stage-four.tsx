import z from "zod";
import { ValidationSchema } from "@/components/form";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormRow } from "@/components/form-row";

const getUsernameID = async (username: String): Promise<number> => {
  try {
    const url = "https://corsproxy.io/?" +
      encodeURIComponent("https://users.roblox.com/v1/usernames/users");
    const response = await fetch(
      url,
      {
        method: "POST",
        headers: {
          "accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usernames: [username],
          excludeBannedUsers: true,
        }),
      },
    );

    const userData = await response.json();
    if (userData["data"].length > 0) {
      const userID = userData["data"][0].id;
      return parseInt(userID);
    } else {
      return -1;
    }
  } catch (error) {
    console.error("Error occurred while retrieving user data:", error);
    return -1;
  }
};

const getUserDisplayname = async (username: String): Promise<String> => {
  try {
    const url = "https://corsproxy.io/?" +
      encodeURIComponent("https://users.roblox.com/v1/usernames/users");
    const response = await fetch(
      url,
      {
        method: "POST",
        headers: {
          "accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usernames: [username],
          excludeBannedUsers: true,
        }),
      },
    );

    const userData = await response.json();
    if (userData["data"].length > 0) {
      return userData["data"][0].displayName;
    } else {
      return "";
    }
  } catch (error) {
    console.error("Error occurred while retrieving user data:", error);
    return "";
  }
};

const checkIfBadge = async (
  userID: number,
  badgeID: number,
): Promise<boolean> => {
  try {
    let cursor = "";
    while (true) {
      const url = "https://corsproxy.io/?" +
        encodeURIComponent(
          `https://badges.roblox.com/v1/users/${userID}/badges?limit=100&cursor=${cursor}&sortOrder=Desc`,
        );
      const response = await fetch(
        url,
        {
          method: "GET",
          headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      const userData = await response.json();
      if (userData["data"].find((badge: any) => badge.id === badgeID)) {
        return true;
      } else {
        if (userData["nextPageCursor"]) {
          cursor = userData["nextPageCursor"];
        } else {
          return false;
        }
      }
    }
  } catch (error) {
    console.error("Error occurred while retrieving user data:", error);
    return false;
  }
};

export const stageFourSchema = z.object({
  robloxName: z.string().min(1, { message: "Roblox username is required." }),
  robloxName2: z.string().min(1, { message: "Roblox username is required." }),
})
  .refine(async (data) => {
    const id = await getUsernameID(data.robloxName);
    return id !== -1;
  }, {
    path: ["robloxName"],
    message: "Roblox username must be valid.",
  })
  .refine(async (data) => {
    const id = await getUsernameID(data.robloxName);
    if (id == -1) return false;
    return await checkIfBadge(id, 2148471489);
  }, {
    path: ["robloxName"],
    message: "Roblox user has not beaten the game.",
  })
  .refine(async (data) => {
    const id = await getUsernameID(data.robloxName2);
    return id !== -1;
  }, {
    path: ["robloxName2"],
    message: "Roblox username must be valid.",
  })
  .refine(async (data) => {
    const id = await getUsernameID(data.robloxName2);
    if (id == -1) return false;
    const displayName = await getUserDisplayname(data.robloxName2);
    return displayName.toLowerCase().includes("junction");
  }, {
    path: ["robloxName2"],
    message: "Roblox user does not have Junction in their display name.",
  });

export function StageFour({
  register,
  errors,
}: {
  register: UseFormRegister<ValidationSchema>;
  errors: FieldErrors<ValidationSchema>;
}) {
  return (
    <>
      <FormRow
        id="robloxName"
        label="Insert the name of a Roblox account that has beaten the following game."
        errors={errors.robloxName}
        inputProps={{
          id: "robloxName",
          placeholder: "Roblox Username",
          ...register("robloxName", { required: true }),
        }}
      >
        <span className="bg-gray-600 text-white text-xs font-medium my-3 px-2.5 py-0.5 rounded">
          SPONSORED LISTING
        </span>
        <a
          target="_blank"
          className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
          href="https://www.roblox.com/games/5980231041/"
        >
          Game link
        </a>
      </FormRow>
      <FormRow
        id="robloxName2"
        label="Insert the name of a Roblox account whose display name contains Junction."
        errors={errors.robloxName2}
        inputProps={{
          id: "robloxName2",
          placeholder: "Roblox Username",
          ...register("robloxName2", { required: true }),
        }}
      >
        <span className="bg-gray-600 text-white text-xs font-medium my-3 px-2.5 py-0.5 rounded">
          SPONSORED LISTING
        </span>
      </FormRow>
    </>
  );
}
