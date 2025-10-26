import {getCountdownInfo} from "@/features/problems/actions/problemStateActions";
import { User } from "@/shared/models/User";

export const isCountdownActive = async (user : User) => {
  const info = await getCountdownInfo();
  if (info) {
    return info.isActive
  }
  return false;
}

export const countdownRemainingSeconds = async (user : User) => {
  const info = await getCountdownInfo();
  if (info) {
    return info.remainingSeconds;
  }
  return null;
}



export const fetchUserCountdown = async (user : User) : Promise<number> => {
  let userCountdown : number | null;
  if (await isCountdownActive(user)) {
    userCountdown = await countdownRemainingSeconds(user);
    if (userCountdown === null) {
        userCountdown = 0;
    }
  } else {
    userCountdown = 0;
  }

  return userCountdown;
}