import { cn } from '@/lib/utils'
export function Container({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)} {...props} />
}
export function ContainerOuter({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div className={cn('sm:px-8', className)} {...props} />
}
export function ContainerInner({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)} {...props} />
}
