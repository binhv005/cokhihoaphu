import { z } from 'zod'

// Số điện thoại Việt Nam: 0xxxxxxxxx hoặc +84xxxxxxxxx (cho phép dấu cách, chấm, gạch)
const phoneRe = /^(?:\+?84|0)(?:3|5|7|8|9|2\d)\d{7,8}$/
const normalizePhone = (v) => v.replace(/[\s.-]/g, '')

const phone = z.string().trim().refine((v) => phoneRe.test(normalizePhone(v)), { message: 'phone' })
const optionalEmail = z.string().trim().refine((v) => v === '' || z.email().safeParse(v).success, { message: 'email' })

export const contactSchema = z.object({
  name: z.string().trim().min(2, { message: 'name' }),
  company: z.string().trim().optional(),
  phone,
  email: optionalEmail,
  message: z.string().trim().min(10, { message: 'message' }),
})

export const quoteSchema = z.object({
  name: z.string().trim().min(2, { message: 'name' }),
  company: z.string().trim().optional(),
  phone,
  email: optionalEmail,
  address: z.string().trim().optional(),
  product: z.string().trim().min(2, { message: 'product' }),
  category: z.string().optional(),
  quantity: z.string().trim().refine((v) => v === '' || /^[1-9]\d*$/.test(v), { message: 'quantity' }),
  usage: z.string().trim().optional(),
  extra: z.string().trim().optional(),
  agree: z.boolean().refine((v) => v === true, { message: 'agree' }),
})
