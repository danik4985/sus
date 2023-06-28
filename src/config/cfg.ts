import { CONFIG_PATH } from '../main'
import { loadConfig, __cfg } from './loadConfig'

export const cfg = () => __cfg[__cfg.length - 1] ?? loadConfig(CONFIG_PATH)