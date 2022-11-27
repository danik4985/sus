import { CONFIG_PATH } from '../main'
import { loadConfig, __cfg } from './loadConfig'

export const cfg = () => __cfg ?? loadConfig(CONFIG_PATH)