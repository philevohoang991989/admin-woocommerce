export type bodyUser = {
   id: number
   username: string
   password: string
   password_confirm?: string
   avatar?: string
   full_name: string
   email: string
   phone: string
   status?: string
   role?:number
   created_at: string
   update_at: string
}