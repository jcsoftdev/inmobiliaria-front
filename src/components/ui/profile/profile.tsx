import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from '@heroui/react'
import { memo } from 'react'

import {
  authStorageKeys,
  removeLocalStorage,
  UserStore,
} from '@components/modules/login/utils'

import { useIndexedDBStorage } from '@hooks/use-indexeddb-storage'

const Profile = memo(
  () => {
    const { value: user } = useIndexedDBStorage<UserStore>(authStorageKeys.user)

    return (
      <div className="flex justify-end items-center gap-4 px-4 h-full">
        {!user ? (
          <div className="animate-pulse flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="flex flex-col gap-1">
              <div className="w-24 h-4 bg-gray-300 rounded"></div>
              <div className="w-16 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        ) : (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  src: 'https://i.pravatar.cc/150',
                }}
                className="transition-transform"
                description={`@${user?.username}`}
                name={user?.name}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user?.email}</p>
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
        )}
      </div>
    )
  },
  (prevProps, nextProps) => {
    return prevProps === nextProps
  },
)

export default Profile
