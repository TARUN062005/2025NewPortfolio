"use client"

import type React from "react"

// Adapted from shadcn/ui toast component
import { useState, useEffect, useCallback } from "react"

export type ToastProps = {
  id?: string
  title?: string
  description?: string
  action?: React.ReactNode
  duration?: number
}

export type ToastActionElement = React.ReactElement<{
  altText: string
  onClick: () => void
}>

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 1000

type ToasterToast = ToastProps & {
  id: string
  visible: boolean
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

const toasts: ToasterToast[] = []

type ToastActionType = (props: ToastProps) => void

export function useToast() {
  const [, setToastCount] = useState(0)

  useEffect(() => {
    return () => {
      toasts.splice(0, toasts.length)
    }
  }, [])

  const toast: ToastActionType = useCallback((props) => {
    const id = props.id || genId()
    const newToast = {
      ...props,
      id,
      visible: true,
    }

    toasts.push(newToast)
    setToastCount((count) => count + 1)

    setTimeout(() => {
      dismissToast(id)
    }, props.duration || 5000)

    return id
  }, [])

  const dismissToast = useCallback((id: string) => {
    const index = toasts.findIndex((toast) => toast.id === id)
    if (index !== -1) {
      toasts[index].visible = false
      setToastCount((count) => count - 1)

      setTimeout(() => {
        toasts.splice(index, 1)
        setToastCount((count) => count + 1)
      }, TOAST_REMOVE_DELAY)
    }
  }, [])

  const getToasts = useCallback(() => {
    return toasts.filter((toast) => toast.visible).slice(0, TOAST_LIMIT)
  }, [])

  return {
    toast,
    dismissToast,
    getToasts,
  }
}
