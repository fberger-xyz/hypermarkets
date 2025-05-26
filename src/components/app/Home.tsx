'use client'

import { useQueries } from '@tanstack/react-query'
import { useMemo, useCallback, memo, useState, useEffect } from 'react'
import { fetchAllMarkets } from '@/utils/markets.util'
import { useAppStore } from '@/stores/app.store'
import { FilterSection, FilterWrapper } from './Filters'
import { IconIds, MarketsSortedBy, MarketsSortedByDirection, SupportedProtocolNames, SupportedUnderlyingAssetSymbols } from '@/enums'
import FileMapper from '../icons/FileMapper'
import { Market } from '@/interfaces'
import { cleanOutput, cn, extractErrorMessage } from '@/utils'
import UpdatedAt from './UpdatedAt'
import numeral from 'numeral'
import TokenImage from './TokenImage'
import LinkWrapper from '../common/LinkWrapper'
import IconWrapper from '../common/IconWrapper'
import { APP_PROTOCOLS } from '@/config/protocols.config'
import StyledTooltip from '../common/StyledTooltip'
import toast from 'react-hot-toast'

// memoized marketrow component
const MarketRow = memo(({ market, index }: { market: Market; index: number }) => (
    <div
        className={cn('px-2 grid grid-cols-10 items-center hover:bg-primary/20 font-light transition-all duration-200', {
            'bg-default/5': index % 2,
        })}
    >
        <div className="flex justify-center">
            <p className="text-default text-xs opacity-50">{index + 1}</p>
        </div>
        <div className="flex justify-center py-1.5">
            <LinkWrapper
                href={`https://purrsec.com/address/${market.token.address}`}
                target="_blank"
                className="flex gap-2 items-center rounded-xl bg-default/10 py-1 px-1.5 relative overflow-hidden group"
            >
                <TokenImage token={market.token} className="size-5 rounded-full bg-background" />
                <p className="text-sm w-max truncate font-light text-primary">{market.token.symbol}</p>
                <div className="absolute inset-0 backdrop-blur hidden group-hover:flex justify-center items-center rounded-xl text-xs cursor-alias">
                    <p className="font-light">Purrsec</p>
                    <IconWrapper id={IconIds.OPEN_LINK_IN_NEW_TAB} className="size-3.5" />
                </div>
            </LinkWrapper>
        </div>
        <div className="flex justify-center">
            <LinkWrapper
                href={APP_PROTOCOLS[market.protocol].urls.ref ?? APP_PROTOCOLS[market.protocol].urls.website}
                target="_blank"
                className="flex gap-2 items-center rounded-xl bg-default/10 py-1 px-1.5 relative overflow-hidden group"
            >
                <FileMapper id={market.protocol} className="size-5 rounded-full" />
                <p className="text-sm w-max font-light text-primary">{APP_PROTOCOLS[market.protocol]?.name}</p>
                <div className="absolute inset-0 backdrop-blur hidden group-hover:flex justify-center items-center rounded-xl text-xs cursor-alias">
                    <p className="font-light truncate">{market.protocol}</p>
                    <IconWrapper id={IconIds.OPEN_LINK_IN_NEW_TAB} className="size-3.5" />
                </div>
            </LinkWrapper>
        </div>
        <div className="flex justify-center">
            <p className="text-default text-xs opacity-50">{market.type}</p>
        </div>
        <div className="flex justify-center">
            <StyledTooltip disableAnimation content={<p className="text-sm">{numeral(market.state.supply.usd).format('0,0.00$')}</p>}>
                <p className="text-sm">{cleanOutput(numeral(market.state.supply.usd).format('0,0a$'))}</p>
            </StyledTooltip>
        </div>
        <div className="flex justify-center bg-default/5 h-full items-center">
            <div
                className={cn('flex gap-2 items-center rounded-xl py-0.5 px-1.5', {
                    'bg-default/10': market.state.supply.apy >= 0.00005,
                })}
            >
                <p className="text-sm text-primary">{cleanOutput(numeral(market.state.supply.apy).format('0,0.[00]%'))}</p>
            </div>
        </div>
        <div className="flex justify-center">
            <StyledTooltip disableAnimation content={<p className="text-sm">{numeral(market.state.borrow.usd).format('0,0.00$')}</p>}>
                <p className="text-sm">{cleanOutput(numeral(market.state.borrow.usd).format('0,0a$'))}</p>
            </StyledTooltip>
        </div>
        <div className="flex justify-center bg-default/5 h-full items-center">
            <div
                className={cn('flex gap-2 items-center rounded-xl py-0.5 px-1.5', {
                    'bg-default/10': market.state.borrow.apy >= 0.00005,
                })}
            >
                <p className="text-sm text-primary">{cleanOutput(numeral(market.state.borrow.apy).format('0,0.[00]%'))}</p>
            </div>
        </div>
        <div className="flex justify-center">
            <p className="text-sm">{cleanOutput(numeral(market.state.usage).format('0,0%'))}</p>
        </div>
        <div className="flex justify-center">
            {/* <StyledTooltip
                disableAnimation
                closeDelay={800}
                content={
                    <div className="flex flex-col gap-1">
                        <LinkWrapper
                            href={market.link}
                            target="_blank"
                            className="flex justify-center hover:text-primary bg-default/5 hover:bg-default/10 px-4 py-1.5 rounded-lg gap-1"
                        >
                            <p className="text-sm">Open market in {market.protocol}</p>
                            <IconWrapper id={IconIds.OPEN_LINK_IN_NEW_TAB} className="size-4" />
                        </LinkWrapper>
                        {market.protocol === SupportedProtocolNames.HYPERBEAT && (
                            <LinkWrapper
                                href={market.purrsec}
                                target="_blank"
                                className="flex justify-center hover:text-primary bg-default/5 hover:bg-default/10 px-4 py-1.5 rounded-lg gap-1"
                            >
                                <p className="text-sm">See vault on {SupportedExplorers.PURRSEC}</p>
                                <IconWrapper id={IconIds.OPEN_LINK_IN_NEW_TAB} className="size-4" />
                            </LinkWrapper>
                        )}
                        {APP_PROTOCOLS[market.protocol]?.urls.ref ? (
                            <LinkWrapper
                                href={APP_PROTOCOLS[market.protocol]?.urls.ref}
                                target="_blank"
                                className="flex bg-background/80 text-primary justify-center hover:bg-background px-4 py-1.5 rounded-lg gap-1"
                            >
                                <p className="text-sm font-bold">GET OUR REFERRAL ❤️</p>
                            </LinkWrapper>
                        ) : null}
                    </div>
                }
            >
                <div className="flex justify-center opacity-50 hover:opacity-100 hover:text-primary hover:bg-default/10 px-2 py-1.5 rounded-xl cursor-pointer">
                    <IconWrapper id={IconIds.LINK} className="size-5" />
                </div>
            </StyledTooltip> */}
            {APP_PROTOCOLS[market.protocol]?.urls.ref ? (
                <LinkWrapper
                    href={APP_PROTOCOLS[market.protocol]?.urls.ref}
                    target="_blank"
                    className="flex bg-default/5 text-primary justify-center hover:bg-default/20 px-2 py-1 rounded-xl gap-1 cursor-alias transition-all duration-200 ease-in-out"
                >
                    <p className="text-sm font-bold">❤️</p>
                </LinkWrapper>
            ) : (
                <p className="text-default text-xs opacity-50">soon</p>
            )}
        </div>
    </div>
))

MarketRow.displayName = 'MarketRow'

// memoized tableheader component
const TableHeader = memo(
    ({
        marketsSortedBy,
        marketsSortedByDirection,
        onSort,
    }: {
        marketsSortedBy: MarketsSortedBy
        marketsSortedByDirection: MarketsSortedByDirection
        onSort: (sortBy: MarketsSortedBy) => void
    }) => (
        <div className="grid grid-cols-10 items-center text-default text-xs border-b border-default/10 px-2">
            <div className="flex justify-center items-center py-2">
                <p className="font-light opacity-50">#</p>
            </div>
            <div className="flex justify-center items-center">
                <p className="font-light opacity-50">Asset</p>
            </div>
            <div className="flex justify-center items-center">
                <p className="font-light opacity-50">Protocol</p>
            </div>
            <div className="flex justify-center items-center">
                <p className="font-light opacity-50">Type</p>
            </div>
            {[
                { sortBy: MarketsSortedBy.SUPPLIED_USD, label: 'Supplied', className: '' },
                { sortBy: MarketsSortedBy.SUPPLY_APY, label: 'Supply API', className: 'bg-default/5 h-full' },
                { sortBy: MarketsSortedBy.BORROWED_USD, label: 'Borrowed', className: '' },
                { sortBy: MarketsSortedBy.BORROW_APY, label: 'Borrow API', className: 'bg-default/5 h-full' },
                { sortBy: MarketsSortedBy.USAGE, label: 'Usage', className: '' },
            ].map(({ sortBy, label, className }) => (
                <button key={sortBy} className={cn('flex gap-1 justify-center items-center col-span-1', className)} onClick={() => onSort(sortBy)}>
                    <p className={cn({ 'opacity-50 font-light': marketsSortedBy !== sortBy })}>{label}</p>
                    <div className="flex flex-col">
                        <IconWrapper
                            id={IconIds.TRIANGLE_UP}
                            className={cn('size-6 opacity-30', {
                                'opacity-100': marketsSortedBy === sortBy && marketsSortedByDirection === MarketsSortedByDirection.ASC,
                            })}
                        />
                        <IconWrapper
                            id={IconIds.TRIANGLE_DOWN}
                            className={cn('size-6 -mt-[18px] opacity-30', {
                                'opacity-100': marketsSortedBy === sortBy && marketsSortedByDirection === MarketsSortedByDirection.DESC,
                            })}
                        />
                    </div>
                </button>
            ))}
            <div className="flex justify-center items-center">
                <p className="opacity-50 font-light">Referrals</p>
            </div>
        </div>
    ),
)

TableHeader.displayName = 'TableHeader'

export default function Home() {
    const [filteredMarkets, setFilteredMarkets] = useState<Market[]>([])
    const {
        uiAssets,
        uiProtocols,
        marketsSortedBy,
        marketsSortedByDirection,
        appStoreRefreshedAt,
        setMarkets,
        getMarkets,
        toggleUiUnderlyingAsset,
        toggleUiProtocol,
        setMarketsSort,
        setMarketsSortedByDirection,
    } = useAppStore()

    // sort handler
    const handleSort = useCallback(
        (sortBy: MarketsSortedBy) => {
            if (marketsSortedBy === sortBy) {
                setMarketsSortedByDirection(
                    marketsSortedByDirection === MarketsSortedByDirection.ASC ? MarketsSortedByDirection.DESC : MarketsSortedByDirection.ASC,
                )
            } else {
                setMarketsSort(sortBy, MarketsSortedByDirection.ASC)
            }
        },
        [marketsSortedBy, marketsSortedByDirection, setMarketsSort, setMarketsSortedByDirection],
    )

    // get markets matching filters
    const filterMarkets = () => {
        const markets = getMarkets().filter((market) => uiProtocols[market.protocol] && uiAssets[market.token.underlying])
        return markets.sort((curr, next) => {
            const a =
                marketsSortedBy === MarketsSortedBy.SUPPLIED_USD
                    ? curr.state.supply.usd
                    : marketsSortedBy === MarketsSortedBy.SUPPLY_APY
                      ? curr.state.supply.apy
                      : marketsSortedBy === MarketsSortedBy.BORROWED_USD
                        ? curr.state.borrow.usd
                        : marketsSortedBy === MarketsSortedBy.BORROW_APY
                          ? curr.state.borrow.apy
                          : marketsSortedBy === MarketsSortedBy.USAGE
                            ? curr.state.usage
                            : 0

            const b =
                marketsSortedBy === MarketsSortedBy.SUPPLIED_USD
                    ? next.state.supply.usd
                    : marketsSortedBy === MarketsSortedBy.SUPPLY_APY
                      ? next.state.supply.apy
                      : marketsSortedBy === MarketsSortedBy.BORROWED_USD
                        ? next.state.borrow.usd
                        : marketsSortedBy === MarketsSortedBy.BORROW_APY
                          ? next.state.borrow.apy
                          : marketsSortedBy === MarketsSortedBy.USAGE
                            ? next.state.usage
                            : 0

            return marketsSortedByDirection === MarketsSortedByDirection.ASC ? a - b : b - a
        })
    }

    useEffect(() => {
        setFilteredMarkets(filterMarkets)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uiProtocols, uiAssets, marketsSortedBy, marketsSortedByDirection, appStoreRefreshedAt])

    // memoize the markets query
    useQueries({
        queries: [
            {
                queryKey: ['marketsQuery'],
                enabled: true,
                queryFn: async () => {
                    try {
                        const markets = await fetchAllMarkets()
                        console.log({ markets })
                        setMarkets(markets)
                        toast.success(`Markets data refreshed`)
                        return markets
                    } catch (error) {
                        toast.error(`Markets query: ${extractErrorMessage(error)}`)
                    }
                },
                refetchOnWindowFocus: false,
                refetchOnMount: false,
                refetchInterval: 1000 * 30,
            },
        ],
    })

    // memoize the totals calculation
    const totals = useMemo(() => {
        if (filteredMarkets.length === 0) return null
        const totalSupplyUsd = filteredMarkets.reduce((acc, curr) => acc + curr.state.supply.usd, 0)
        const totalBorrowUsd = filteredMarkets.reduce((acc, curr) => acc + curr.state.borrow.usd, 0)
        const weightedSupplyApy = filteredMarkets.reduce((acc, curr) => acc + curr.state.supply.usd * curr.state.supply.apy, 0) / totalSupplyUsd
        const weightedBorrowApy = filteredMarkets.reduce((acc, curr) => acc + curr.state.borrow.usd * curr.state.borrow.apy, 0) / totalBorrowUsd
        return { totalSupplyUsd, totalBorrowUsd, weightedSupplyApy, weightedBorrowApy }
    }, [filteredMarkets])

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
                            integrated={Boolean(APP_PROTOCOLS[key].integrated)}
                            isActive={Boolean(uiProtocols[key])}
                            tooltipContent={
                                <div className="flex flex-col gap-1 items-center">
                                    <p className="text-primary font-bold">{key}</p>
                                    <LinkWrapper
                                        href={APP_PROTOCOLS[key].urls.ref ?? APP_PROTOCOLS[key].urls.website}
                                        target="_blank"
                                        className={cn(
                                            'flex justify-center hover:text-primary gap-1 border-b border-transparent hover:border-primary',
                                        )}
                                    >
                                        <p>{APP_PROTOCOLS[key].urls.website}</p>
                                        <IconWrapper id={IconIds.OPEN_LINK_IN_NEW_TAB} className="size-5" />
                                    </LinkWrapper>
                                    {APP_PROTOCOLS[key].integrated ? <p>Integrated ✅</p> : <p className="opacity-50">Not yet integrated 🚧</p>}
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
                <div className="w-full overflow-x-scroll px-4 lg:pl-4 lg:pr-0">
                    <div className="flex flex-col border rounded-xl border-default/10 min-w-[1080px] overflow-hidden">
                        <TableHeader marketsSortedBy={marketsSortedBy} marketsSortedByDirection={marketsSortedByDirection} onSort={handleSort} />

                        {/* content */}
                        {filteredMarkets.length === 0 ? (
                            <div className="transition-all duration-200">
                                {Array(12)
                                    .fill(0)
                                    .map((_, i) => (
                                        <div
                                            key={i}
                                            className={cn('px-2 py-1.5 grid grid-cols-10 items-center hover:bg-primary/20 font-light', {
                                                'bg-default/5': i % 2,
                                            })}
                                        >
                                            {Array(10)
                                                .fill(0)
                                                .map((_, i) => (
                                                    <div key={i} className="flex justify-center">
                                                        <span className="skeleton-loading text-transparent w-10 h-[28px]" />
                                                    </div>
                                                ))}
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <div className="transition-all duration-200 overflow-hidden">
                                {filteredMarkets.map((market) => (
                                    <MarketRow
                                        key={`${market.protocol}-${market.token.address}`}
                                        market={market}
                                        index={filteredMarkets.indexOf(market)}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Totals */}
                        {totals && (
                            <div className="px-2 grid grid-cols-10 items-center hover:bg-primary/20 h-10 text-xs text-primary font-light border-t border-default/10">
                                <div className="flex justify-start col-span-3" />
                                <span />
                                <div className="flex justify-center">
                                    <StyledTooltip disableAnimation content={<p>{numeral(totals.totalSupplyUsd).format('0,0.00')}</p>}>
                                        <p>{numeral(totals.totalSupplyUsd).format('0,0a$')}</p>
                                    </StyledTooltip>
                                </div>
                                <div className="flex justify-center bg-default/5 h-full items-center py-1.5">
                                    <p>{numeral(totals.weightedSupplyApy).format('0,0.[00]%')}</p>
                                </div>
                                <div className="flex justify-center">
                                    <StyledTooltip disableAnimation content={<p>{numeral(totals.totalBorrowUsd).format('0,0.00')}</p>}>
                                        <p>{numeral(totals.totalBorrowUsd).format('0,0a$')}</p>
                                    </StyledTooltip>
                                </div>
                                <div className="flex justify-center bg-default/5 h-full items-center">
                                    <p>{numeral(totals.weightedBorrowApy).format('0,0.[00]%')}</p>
                                </div>
                                <span />
                            </div>
                        )}
                    </div>

                    <br />
                </div>
            </div>
        </div>
    )
}
