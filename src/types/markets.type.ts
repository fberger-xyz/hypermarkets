import { ReserveDataHumanized } from '@aave/contract-helpers'
import { FormatReserveUSDResponse } from '@aave/math-utils'

export type AaveFormattedReserve = ReserveDataHumanized & FormatReserveUSDResponse
