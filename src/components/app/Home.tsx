'use client'

import { useQueries } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { fetchAllMarkets } from '@/utils/markets.util'
import { useAppStore } from '@/stores/app.store'
import { FilterSection, FilterWrapper } from './Filters'
import { IconIds, SupportedProtocolNames, SupportedUnderlyingAssetSymbols } from '@/enums'
import FileMapper from '../icons/FileMapper'
import { Market } from '@/interfaces'
import { cn, extractErrorMessage } from '@/utils'
import UpdatedAt from './UpdatedAt'
import numeral from 'numeral'
import AscDescFilters from './AscDescFilters'
import TokenImage from './TokenImage'
import LinkWrapper from '../common/LinkWrapper'
import IconWrapper from '../common/IconWrapper'
import { APP_PROTOCOLS } from '@/config/protocols.config'
import StyledTooltip from '../common/StyledTooltip'
import toast from 'react-hot-toast'

export default function Home() {
    const { uiAssets, uiProtocols, appStoreRefreshedAt, setMarkets, getMarkets, toggleUiUnderlyingAsset, toggleUiProtocol } = useAppStore()
    const getFilteredAndSortedMarkets = () =>
        getMarkets()
            .filter((market) => uiProtocols[market.protocol] && uiAssets[market.token.underlying])
            .sort((curr, next) => next.state.supply.usd - curr.state.supply.usd)
    const [filteredMarkets, setFilteredMarkets] = useState<Market[]>(getFilteredAndSortedMarkets())
    const [marketsQuery] = useQueries({
        queries: [
            {
                queryKey: ['marketsQuery'],
                enabled: true,
                queryFn: async () => {
                    try {
                        const markets = await fetchAllMarkets()
                        setMarkets(markets)
                        return markets
                    } catch (error) {
                        toast.error(`Markets query: ${extractErrorMessage(error)}`)
                    }
                },
                refetchOnWindowFocus: true,
                refetchOnMount: true,
                refetchInterval: 1000 * 30,
            },
        ],
    })
    useEffect(() => {
        setFilteredMarkets(getFilteredAndSortedMarkets())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uiAssets, uiProtocols, appStoreRefreshedAt])

    /**
     * - 1 cool table: code arrows
     * - 1 cool bg: https://drip.trade/collections/hypio
     * - powered by evm
     * - add liminal ?
     */

    return (
        <div className="flex flex-col w-full gap-8 md:gap-10">
            {/* filters */}
            <div className="flex flex-col items-center md:flex-row md:flex-wrap gap-6 md:gap-10 mx-auto px-4">
                <FilterSection title="Exposure">
                    {(Object.keys(uiAssets) as SupportedUnderlyingAssetSymbols[]).map((key, keyIndex) => (
                        <FilterWrapper
                            key={`${key}-${keyIndex}`}
                            onClick={() => toggleUiUnderlyingAsset(key)}
                            isActive={Boolean(uiAssets[key])}
                            tooltipContent={<p>{key}</p>}
                        >
                            <FileMapper id={key} className="size-6 md:size-7 rounded-full" />
                        </FilterWrapper>
                    ))}
                </FilterSection>
                <FilterSection title="HyperEVM money markets">
                    {(Object.keys(uiProtocols) as SupportedProtocolNames[]).map((key, keyIndex) => (
                        <FilterWrapper
                            key={`${key}-${keyIndex}`}
                            onClick={() => toggleUiProtocol(key)}
                            isActive={Boolean(uiProtocols[key])}
                            tooltipContent={
                                <div className="flex flex-col items-center">
                                    <LinkWrapper
                                        href={APP_PROTOCOLS[key]?.urls.website}
                                        target="_blank"
                                        className="flex justify-center px-2 py-1 rounded-lg hover:text-primary"
                                    >
                                        <p className="underline">{APP_PROTOCOLS[key]?.urls.website}</p>
                                    </LinkWrapper>
                                </div>
                            }
                        >
                            <FileMapper id={key} className="size-6 md:size-7 rounded-full" />
                        </FilterWrapper>
                    ))}
                </FilterSection>
            </div>

            {/* content */}
            <div className="flex flex-col gap-6">
                <UpdatedAt />
                <div className="w-full overflow-x-scroll px-4 lg:px-0">
                    <div className="flex flex-col border rounded-xl border-default/10 shadow-lg min-w-[1100px]">
                        {/* headers */}
                        <div className="gap-2 px-2 py-2 grid grid-cols-10 items-center text-default text-xs border-b border-default/10 pb-1">
                            <div className="flex justify-center items-center">
                                <p>#</p>
                            </div>
                            <button className="flex justify-center items-center">
                                <p>Asset</p>
                            </button>
                            <button className="flex justify-center items-center">
                                <p>Protocol</p>
                            </button>
                            <button className="flex justify-center items-center">
                                <p>Type</p>
                            </button>
                            <button className="flex justify-center items-center">
                                <p>Supplied</p>
                                <AscDescFilters down={true} />
                            </button>
                            <button className="flex justify-center items-center">
                                <p>Supply APY</p>
                                <AscDescFilters />
                            </button>
                            <button className="flex justify-center items-center">
                                <p>Borrowed</p>
                                <AscDescFilters />
                            </button>
                            <button className="flex justify-center items-center">
                                <p>Borrow APY</p>
                                <AscDescFilters />
                            </button>
                            <button className="flex justify-center items-center">
                                <p>Usage %</p>
                                <AscDescFilters />
                            </button>
                            <button className="flex justify-center items-center">
                                <p>Link</p>
                            </button>
                        </div>

                        {/* content */}
                        {filteredMarkets.length > 0
                            ? filteredMarkets.map((market, marketIndex) => (
                                  <div
                                      key={`${marketIndex}-${market.protocol}`}
                                      className={cn('px-2 py-1.5 grid grid-cols-10 items-center hover:bg-primary/20 font-light', {
                                          'bg-default/5': marketIndex % 2,
                                      })}
                                  >
                                      <div className="flex justify-center">
                                          <p className="text-xs">{marketIndex + 1}</p>
                                      </div>
                                      <div className="flex justify-center">
                                          <div className="flex gap-2 items-center rounded-xl bg-default/10 py-1 px-1.5">
                                              <TokenImage token={market.token} className="size-5 rounded-full bg-background" />
                                              <p className="text-sm w-max truncate font-light text-primary">{market.token.symbol}</p>
                                          </div>
                                      </div>
                                      <div className="flex justify-center">
                                          {/* <StyledTooltip
                                    content={<IframeWrapper src={APP_PROTOCOLS[market.protocol]?.urls.website} />}
                                    disableAnimation
                                    closeDelay={200}
                                > */}
                                          <div className="flex gap-2 items-center rounded-xl bg-default/10 py-1 px-1.5">
                                              <FileMapper id={market.protocol} className="size-5 rounded-full" />
                                              <p className="text-sm w-max truncate font-light text-primary">{APP_PROTOCOLS[market.protocol]?.name}</p>
                                          </div>
                                          {/* </StyledTooltip> */}
                                      </div>
                                      <div className="flex justify-center">
                                          <p className="text-xs">{market.type}</p>
                                      </div>
                                      <div className="flex justify-center">
                                          <StyledTooltip
                                              disableAnimation
                                              content={<p className="text-sm">{numeral(market.state.supply.usd).format('0,0.00$')}</p>}
                                          >
                                              <p className="text-sm">{numeral(market.state.supply.usd).format('0,0a$')}</p>
                                          </StyledTooltip>
                                      </div>
                                      <div className="flex justify-center">
                                          <div className="flex gap-2 items-center rounded-xl bg-default/10 py-1 px-1.5">
                                              <p className="text-sm text-primary">{numeral(market.state.supply.apy).format('0,0.[00]%')}</p>
                                          </div>
                                      </div>
                                      <div className="flex justify-center">
                                          <StyledTooltip
                                              disableAnimation
                                              content={<p className="text-sm">{numeral(market.state.borrow.usd).format('0,0.00$')}</p>}
                                          >
                                              <p className="text-sm">{numeral(market.state.borrow.usd).format('0,0a$')}</p>
                                          </StyledTooltip>
                                      </div>
                                      <div className="flex justify-center">
                                          <div className="flex gap-2 items-center rounded-xl bg-default/10 py-1 px-1.5">
                                              <p className="text-sm text-primary">{numeral(market.state.borrow.apy).format('0,0.[00]%')}</p>
                                          </div>
                                      </div>
                                      <div className="flex justify-center">
                                          <p className="text-sm">{numeral(market.state.usage).format('0,0%')}</p>
                                      </div>
                                      <div className="flex justify-center">
                                          <StyledTooltip
                                              disableAnimation
                                              closeDelay={800}
                                              content={
                                                  <div className="flex flex-col gap-1">
                                                      <LinkWrapper
                                                          href={market.link}
                                                          target="_blank"
                                                          className="flex justify-center hover:text-primary bg-default/5 hover:bg-default/10 px-4 py-1.5 rounded-lg gap-1"
                                                      >
                                                          <p className="text-sm">See this market on {market.protocol}</p>
                                                          <IconWrapper id={IconIds.OPEN_LINK_IN_NEW_TAB} className="size-4" />
                                                      </LinkWrapper>
                                                      {APP_PROTOCOLS[market.protocol]?.urls.ref ? (
                                                          <LinkWrapper
                                                              href={APP_PROTOCOLS[market.protocol]?.urls.ref}
                                                              target="_blank"
                                                              className="flex justify-center hover:text-primary bg-default/5 hover:bg-default/10 px-4 py-1.5 rounded-lg gap-1"
                                                          >
                                                              <p className="text-sm text-emerald-400">Also use my REFERAL</p>
                                                          </LinkWrapper>
                                                      ) : null}
                                                  </div>
                                              }
                                          >
                                              <div className="flex justify-center opacity-50 hover:opacity-100 hover:text-primary hover:bg-default/10 px-2 py-1.5 rounded-lg cursor-pointer">
                                                  <IconWrapper id={IconIds.WEBSITE} className="size-4" />
                                              </div>
                                          </StyledTooltip>
                                      </div>
                                  </div>
                              ))
                            : marketsQuery.isLoading
                              ? [1, 2, 3, 4, 5, 6, 7, 8, 9].map((market, marketIndex) => (
                                    <div
                                        key={`${marketIndex}-${market}`}
                                        className={cn('px-2 py-1.5 grid grid-cols-10 items-center hover:bg-primary/20 font-light', {
                                            'bg-default/5': marketIndex % 2,
                                        })}
                                    >
                                        <div className="flex justify-center">
                                            <span className="skeleton-loading text-transparent w-6 h-[28px]" />
                                        </div>
                                        <div className="flex justify-center">
                                            <div className="flex gap-2 items-center rounded-xl bg-default/10 py-1 px-1.5 skeleton-loading text-transparent w-14 h-[28px]"></div>
                                        </div>
                                        <div className="flex justify-center">
                                            <div className="flex gap-2 items-center rounded-xl bg-default/10 py-1 px-1.5 skeleton-loading text-transparent w-14 h-[28px]"></div>
                                        </div>
                                        <div className="flex justify-center">
                                            <span className="skeleton-loading text-transparent w-10 h-[28px]" />
                                        </div>
                                        <div className="flex justify-center">
                                            <span className="skeleton-loading text-transparent w-10 h-[28px]" />
                                        </div>
                                        <div className="flex justify-center">
                                            <span className="skeleton-loading text-transparent w-10 h-[28px]" />
                                        </div>
                                        <div className="flex justify-center">
                                            <span className="skeleton-loading text-transparent w-10 h-[28px]" />
                                        </div>
                                        <div className="flex justify-center">
                                            <span className="skeleton-loading text-transparent w-10 h-[28px]" />
                                        </div>
                                        <div className="flex justify-center">
                                            <span className="skeleton-loading text-transparent w-10 h-[28px]" />
                                        </div>
                                        <div className="flex justify-center">
                                            <span className="skeleton-loading text-transparent w-10 h-[28px]" />
                                        </div>
                                    </div>
                                ))
                              : null}

                        {/* totals */}
                        {filteredMarkets.length === 0 && (
                            <div className="px-2 py-1.5 grid grid-cols-10 items-center hover:bg-primary/20 h-10 text-xs text-primary font-light pt-1">
                                <div className="flex justify-start col-span-3">{/* <p>Totals or weighted averages</p> */}</div>
                                <span />
                                <div className="flex justify-center">
                                    <StyledTooltip
                                        disableAnimation
                                        content={
                                            <p>
                                                {numeral(filteredMarkets.reduce((acc, curr) => (acc += curr.state.supply.usd), 0)).format('0,0.00')}
                                            </p>
                                        }
                                    >
                                        <p>{numeral(filteredMarkets.reduce((acc, curr) => (acc += curr.state.supply.usd), 0)).format('0,0a$')}</p>
                                    </StyledTooltip>
                                </div>
                                <div className="flex justify-center">
                                    <p>
                                        {numeral(filteredMarkets.reduce((acc, curr) => (acc += curr.state.supply.usd * curr.state.supply.apy), 0))
                                            .divide(filteredMarkets.reduce((acc, curr) => (acc += curr.state.supply.usd), 0))
                                            .format('0,0.[00]%')}
                                    </p>
                                </div>
                                <div className="flex justify-center">
                                    <StyledTooltip
                                        disableAnimation
                                        content={
                                            <p>
                                                {numeral(filteredMarkets.reduce((acc, curr) => (acc += curr.state.borrow.usd), 0)).format('0,0.00')}
                                            </p>
                                        }
                                    >
                                        <p>{numeral(filteredMarkets.reduce((acc, curr) => (acc += curr.state.borrow.usd), 0)).format('0,0a$')}</p>
                                    </StyledTooltip>
                                </div>
                                <div className="flex justify-center">
                                    <p>
                                        {numeral(filteredMarkets.reduce((acc, curr) => (acc += curr.state.borrow.usd * curr.state.borrow.apy), 0))
                                            .divide(filteredMarkets.reduce((acc, curr) => (acc += curr.state.borrow.usd), 0))
                                            .format('0,0.[00]%')}
                                    </p>
                                </div>
                                <span />
                            </div>
                        )}
                    </div>

                    <br />
                    {!marketsQuery.isLoading && filteredMarkets.length === 0 && (
                        <div className="w-full">
                            <p className="font-light mx-auto text-center text-red-500">No markets ? Refresh page</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
