import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from '@heroui/react'

import {
  authStorageKeys,
  removeLocalStorage,
} from '@components/modules/login/utils'

import { useLocalStorage } from '@hooks/use-localStorage'

const Profile = () => {
  const [data] = useLocalStorage<{
    email: string
    name: string
    exp: number
    roles: string[]
    iat: number
    sub: string
    username: string
  }>(authStorageKeys.user, {
    email: '',
    name: '',
    exp: 0,
    roles: [],
    iat: 0,
    sub: '',
    username: '',
  })

  return (
    <div className="flex justify-end items-center gap-4 px-4 h-full">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: 'https://i.pravatar.cc/150',
            }}
            className="transition-transform"
            description={`@${data.username}`}
            name={data.name}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{data.email}</p>
          </DropdownItem>
          <DropdownItem
            key="logout"
            color="warning"
            onPress={() => {
              removeLocalStorage(authStorageKeys.accessToken)
              removeLocalStorage(authStorageKeys.refreshToken)
            }}
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default Profile
