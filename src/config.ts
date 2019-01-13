import { log }      from 'brolog'
import { FileBox }  from 'file-box'
import qrImage      from 'qr-image'

import promiseRetry = require('promise-retry')

export const CHATIE_OFFICIAL_ACCOUNT_QRCODE = 'http://weixin.qq.com/r/qymXj7DEO_1ErfTs93y5'
export const WEBSOCKET_SERVER               = '116.196.92.94:7888'
export const BOT_ID                         = 'wxid_tdax1huk5hgs12'

export function qrCodeForChatie (): FileBox {
  const name                           = 'qrcode-for-chatie.png'
  const type                           = 'png'

  const qrStream = qrImage.image(CHATIE_OFFICIAL_ACCOUNT_QRCODE, { type })
  return FileBox.fromStream(qrStream, name)
}


export async function retry<T> (
  retryableFn: (
    retry: (error: Error) => never,
    attempt: number,
  ) => Promise<T>,
): Promise<T> {
  /**
   * 60 seconds: (to be confirmed)
   *  factor: 3
   *  minTimeout: 10
   *  maxTimeout: 20 * 1000
   *  retries: 9
   */
  const factor     = 3
  const minTimeout = 10
  const maxTimeout = 20 * 1000
  const retries    = 9
  // const unref      = true

  const retryOptions = {
    factor,
    maxTimeout,
    minTimeout,
    retries,
  }
  return promiseRetry(retryOptions, retryableFn)
}

/**
 * VERSION
 */
import readPkgUp from 'read-pkg-up'

const pkg = readPkgUp.sync({ cwd: __dirname }).pkg
export const VERSION = pkg.version

export {
  log,
}
