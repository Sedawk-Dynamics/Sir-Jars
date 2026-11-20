'use client'

import { forwardRef } from 'react'
import HCaptcha from '@hcaptcha/react-hcaptcha'

/**
 * hCaptcha for the Web3Forms-backed contact form. hCaptcha is switched on for
 * the access key in the Web3Forms dashboard, so submissions without a valid
 * token are rejected. This is Web3Forms' shared free-plan site key (from their
 * docs); Web3Forms verifies the token on its own server.
 *
 * Tokens are single-use: call ref.resetCaptcha() after every submit attempt.
 */
const WEB3FORMS_HCAPTCHA_SITEKEY = '50b2fe65-b00b-4b9e-ad62-3ba471098be2'

export const FormCaptcha = forwardRef<HCaptcha, { onToken: (token: string) => void }>(
  function FormCaptcha({ onToken }, ref) {
    return (
      <HCaptcha
        ref={ref}
        sitekey={WEB3FORMS_HCAPTCHA_SITEKEY}
        reCaptchaCompat={false}
        onVerify={(token) => onToken(token)}
        onExpire={() => onToken('')}
        onError={() => onToken('')}
      />
    )
  },
)

export type { HCaptcha }
