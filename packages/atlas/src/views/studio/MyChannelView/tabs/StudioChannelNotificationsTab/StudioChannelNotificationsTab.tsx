import { RefObject, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { ActionBar } from '@/components/ActionBar'
import { NotificationsTable } from '@/components/NotificationsTable'
import { Portal } from '@/components/Portal'
import { EntitySettingTemplate } from '@/components/_templates/EntitySettingTemplate'

import { StyledForm } from './StudioChannelNotificationsTab.styles'

const TABLE_STRUCTURE = [
  {
    title: 'Generic',
    rows: [
      {
        label: 'New channel created',
        names: { inApp: 'channelCreatedInAppNotificationEnabled', email: 'channelCreatedMailNotificationEnabled' },
      },
    ],
  },
  {
    title: 'Engagement',
    rows: [
      {
        label: 'Someone replied to your comment',
        names: { inApp: 'commentRepyInAppNotificationEnabled', email: 'commentRepyMailNotificationEnabled' },
      },
      {
        label: 'Someone reacted to your comment',
        names: { inApp: 'commentReactionInAppNotificationEnabled', email: 'commentReactionMailNotificationEnabled' },
      },
    ],
  },
  {
    title: 'Followed channels',
    rows: [
      {
        label: 'Posted a new video',
        names: { inApp: 'newVideoInAppNotificationEnabled', email: 'newVideoMailNotificationEnabled' },
      },
      {
        label: 'Put a new NFT on auction',
        names: { inApp: 'newNftAuctionInAppNotificationEnabled', email: 'newNftAuctionMailNotificationEnabled' },
      },
      {
        label: 'Put a new NFT on sale',
        names: { inApp: 'newNftSaleInAppNotificationEnabled', email: 'newNftSaleMailNotificationEnabled' },
      },
    ],
  },
  {
    title: 'NFT',
    rows: [
      {
        label: 'Someone placed higher bid than you',
        names: { inApp: 'auctionOutBidInAppNotificationEnabled', email: 'auctionOutBidMailNotificationEnabled' },
      },
      {
        label: 'Auction you participated in expired',
        names: { inApp: 'auctionExpiredInAppNotificationEnabled', email: 'auctionExpiredMailNotificationEnabled' },
      },
      {
        label: 'You won the auction',
        names: { inApp: 'auctionWonInAppNotificationEnabled', email: 'auctionWonMailNotificationEnabled' },
      },
      {
        label: 'You lost the auction',
        names: { inApp: 'auctionLostInAppNotificationEnabled', email: 'auctionLostMailNotificationEnabled' },
      },
      {
        label: 'Your bid withdrawal is enabled',
        names: {
          inApp: 'auctionBidWithdrawalInAppNotificationEnabled',
          email: 'auctionBidWithdrawalMailNotificationEnabled',
        },
      },
    ],
  },
  {
    title: 'Payout',
    rows: [
      {
        label: 'You receive funds from council',
        names: { inApp: 'fundFromCouncilInAppNotificationEnabled', email: 'fundFromCouncilMailNotificationEnabled' },
      },
      {
        label: 'You send funds to external wallet',
        names: { inApp: 'fundSentInAppNotificationEnabled', email: 'fundSentMailNotificationEnabled' },
      },
      {
        label: 'You receive funds from working group',
        names: { inApp: 'fundFromWgInAppNotificationEnabled', email: 'fundFromWgMailNotificationEnabled' },
      },
    ],
  },
]

const useMemberSettingsData = () => {
  const [data, setData] = useState<Record<string, boolean> | undefined>()

  useEffect(() => {
    // TODO: Fetch data from Orion
    new Promise((r) => setTimeout(r, 1000)).then(() =>
      setData({
        channelCreatedInAppNotificationEnabled: true,
        channelCreatedMailNotificationEnabled: true,
        commentRepyInAppNotificationEnabled: true,
        commentRepyMailNotificationEnabled: true,
        commentReactionInAppNotificationEnabled: true,
        commentReactionMailNotificationEnabled: true,
        newVideoInAppNotificationEnabled: true,
        newVideoMailNotificationEnabled: true,
        newNftAuctionInAppNotificationEnabled: true,
        newNftAuctionMailNotificationEnabled: true,
        newNftSaleInAppNotificationEnabled: true,
        newNftSaleMailNotificationEnabled: true,
        auctionOutBidInAppNotificationEnabled: true,
        auctionOutBidMailNotificationEnabled: true,
        auctionExpiredInAppNotificationEnabled: true,
        auctionExpiredMailNotificationEnabled: true,
        auctionWonInAppNotificationEnabled: true,
        auctionWonMailNotificationEnabled: true,
        auctionLostInAppNotificationEnabled: true,
        auctionLostMailNotificationEnabled: true,
        auctionBidWithdrawalInAppNotificationEnabled: true,
        auctionBidWithdrawalMailNotificationEnabled: true,
        fundFromCouncilInAppNotificationEnabled: true,
        fundFromCouncilMailNotificationEnabled: true,
        fundSentInAppNotificationEnabled: true,
        fundSentMailNotificationEnabled: true,
        fundFromWgInAppNotificationEnabled: true,
        fundFromWgMailNotificationEnabled: true,
      })
    )
  }, [])

  return { isLoading: !data, data }
}

export const StudioChannelNotificationsTab = ({ actionBarPortal }: { actionBarPortal: RefObject<HTMLDivElement> }) => {
  const { data, isLoading } = useMemberSettingsData()

  const form = useForm<Record<string, boolean>>()
  const {
    reset,
    formState: { isDirty },
  } = form

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => reset(data), [reset, data])

  const handleEditNotifications = form.handleSubmit(async (data) => {
    setIsSubmitting(true)
    // TODO: Send data to Orion
    await new Promise((r) => setTimeout(r, 2000))
    reset(data) // Reset with new data
    setIsSubmitting(false)
  })

  return (
    <>
      <StyledForm>
        <EntitySettingTemplate
          title="Channel notifications"
          description="Set up all notifications regarding this channel."
        >
          <NotificationsTable sections={TABLE_STRUCTURE} form={form} disabled={isLoading} />
        </EntitySettingTemplate>
      </StyledForm>
      <Portal containerRef={actionBarPortal}>
        <ActionBar
          primaryButton={{
            text: isSubmitting ? 'Please wait...' : 'Publish changes',
            disabled: isSubmitting || !isDirty,
            onClick: handleEditNotifications,
          }}
          secondaryButton={{
            text: 'Cancel',
            disabled: isSubmitting || !isDirty,
            onClick: () => reset(),
          }}
          isNoneCrypto
        />
      </Portal>
    </>
  )
}
