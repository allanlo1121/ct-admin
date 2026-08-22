import { CreateMqttUserInput, mqttAclSchema } from "../schemas";
import {
  CreateMqttUserServiceInput,
  MqttUserDetail,
  MqttUserInsert,
  MqttUserRow,
  MqttUserRowWithAcl,
  MqttUserType,
  MqttUserView,
  MqttUserWithAcl,
} from "../types";

export function mapMqttUserWithAclFromMqttUserRowWithAcl(
  input: MqttUserRowWithAcl
): MqttUserWithAcl {
  return {
    user: {
      username: input.user.username,
      userType: input.user.user_type, // 这里需要根据实际情况设置用户类型
      tbmCode: input.user.tbm_code,
      isSuperuser: input.user.is_superuser,
      topicPrefix: input.user.topic_prefix,
      isEnabled: input.user.is_enabled,
    },
    acl: input.acl.map((item) => ({
      username: item.username,
      permission: item.permission,
      action: item.action,
      topic: item.topic,
    })),
  };
}



export function mapMqttUserViewToMqttUserDetail(input: MqttUserView): MqttUserDetail {
  return {
    user: {
      userType: input.user_type!,
      username: input.username!,
      tbmCode: input.tbm_code!,
      isSuperuser: input.is_superuser!,
      topicPrefix: input.topic_prefix!,
      isEnabled: input.is_enabled!,
    },
    acl: mqttAclSchema.parse(input.acl ?? []), // 视图中没有 ACL 信息，暂时返回空数组
    status: {
      isOnline: input.is_online ?? false,
      clientId: input.client_id,
      connectedAt: input.connected_at,
      disconnectedAt: input.disconnected_at,
      disconnectReason: input.disconnect_reason,
    }, // 视图中没有状态信息，暂时返回 null
  };
}

export function mapCreateMqttUserInputToInsert(input: CreateMqttUserServiceInput): MqttUserInsert {
  return {
    user_type: input.userType,
    username: input.username,
    tbm_code: input.tbmCode,
    password_hash: input.passwordHash,
    salt: input.salt,
    topic_prefix: input.topicPrefix,
    is_enabled: input.isEnabled,
    is_superuser: input.isSuperuser,
  };
}
