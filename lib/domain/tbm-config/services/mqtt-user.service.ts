import { insertMqttUser } from "../repositories";



import {
  mapCreateMqttUserInputToInsert,
  mapMqttUserViewToMqttUserDetail,
  mapMqttUserWithAclFromMqttUserRowWithAcl,
} from "../mappers";
import { findByTbmCode } from "../repositories";

import { MqttUserDetail, MqttUserWithAcl } from "../types";
import { CreateMqttUserInput } from "../schemas";
import { appErrors } from "@/lib/shared/contracts";
import { hashMqttPassword } from "../utils/password";

export async function createMqttUser(input: CreateMqttUserInput): Promise<MqttUserWithAcl> {
  const { password, ...rest } = input;
  const { salt, passwordHash } = hashMqttPassword(password);
  const insert = mapCreateMqttUserInputToInsert({ ...rest, passwordHash, salt });
  const result = await insertMqttUser(insert);

  if (!result) {
    throw appErrors.internal("创建MQTT用户失败");
  }

  return mapMqttUserWithAclFromMqttUserRowWithAcl(result);
}



export async function getMqttUserByTbmCode(tbmCode: string): Promise<MqttUserDetail | null> {
  // console.log("===getMqttUserByTbmId===");

  const row = await findByTbmCode(tbmCode);

  if (!row) {
    return null;
  }

  return mapMqttUserViewToMqttUserDetail(row);
}
