import React from 'react'
import { SVG } from '../../@types'
import { useTheme } from 'styled-components'

export const K8sLogo: SVG = ({ size = 16, fill: f, rotate = 0, onClick }) => {
  const theme = useTheme()
  const fill = f || theme.text.secondary

  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      style={{ transform: `rotate(${rotate}deg)` }}
      onClick={onClick}
    >
      <path
        fill={fill}
        d='M18.3862 11.574C18.3689 11.574 18.3689 11.574 18.3862 11.574H18.3689C18.3516 11.574 18.3343 11.574 18.3343 11.5562C18.2997 11.5562 18.2651 11.5384 18.2305 11.5384C18.1093 11.5206 18.0055 11.5028 17.9017 11.5028C17.8498 11.5028 17.7979 11.5028 17.7286 11.485H17.7113C17.3479 11.4494 17.0537 11.4138 16.7769 11.3248C16.6557 11.2714 16.6211 11.2002 16.5865 11.129C16.5865 11.1113 16.5692 11.1113 16.5692 11.0935L16.3442 11.0223C16.4481 10.2036 16.4135 9.3493 16.2231 8.51281C16.0328 7.67633 15.704 6.89324 15.254 6.18134L15.4271 6.02116V5.98556C15.4271 5.89658 15.4444 5.80759 15.5136 5.7186C15.7213 5.52283 15.9808 5.36265 16.2923 5.16688C16.3442 5.13128 16.3962 5.11349 16.4481 5.07789C16.5519 5.0245 16.6384 4.97111 16.7423 4.89992C16.7596 4.88212 16.7942 4.86432 16.8288 4.82873C16.8461 4.81093 16.8634 4.81093 16.8634 4.79313C17.1057 4.57956 17.1576 4.22361 16.9845 3.99224C16.898 3.86766 16.7423 3.79647 16.5865 3.79647C16.4481 3.79647 16.3269 3.84986 16.2058 3.93885C16.1885 3.95665 16.1885 3.95665 16.1712 3.97444C16.1366 3.99224 16.1193 4.02784 16.0847 4.04563C15.9981 4.13462 15.9289 4.20581 15.8597 4.2948C15.8251 4.33039 15.7905 4.38379 15.7386 4.41938C15.4963 4.68635 15.2713 4.89992 15.0464 5.06009C14.9945 5.09569 14.9425 5.11349 14.8906 5.11349C14.856 5.11349 14.8214 5.11349 14.7868 5.09569H14.7522L14.5445 5.23807C14.3196 4.9889 14.0773 4.77533 13.835 4.56176C12.7967 3.72528 11.5335 3.20915 10.2183 3.08457L10.201 2.8532C10.1837 2.8354 10.1837 2.8354 10.1664 2.81761C10.1145 2.76421 10.0452 2.71082 10.0279 2.58624C10.0106 2.30148 10.0452 1.98112 10.0799 1.62517V1.60737C10.0799 1.55398 10.0972 1.48279 10.1145 1.4294C10.1318 1.32261 10.1491 1.21583 10.1664 1.09125V0.984461V0.931068C10.1664 0.610713 9.92412 0.34375 9.62993 0.34375C9.49149 0.34375 9.35305 0.41494 9.24922 0.521725C9.1454 0.62851 9.09348 0.77089 9.09348 0.931068V0.966663V1.07345C9.09348 1.19803 9.11079 1.30482 9.1454 1.4116C9.1627 1.46499 9.1627 1.51839 9.18001 1.58958V1.60737C9.21461 1.96332 9.26653 2.28368 9.23192 2.56844C9.21461 2.69302 9.14539 2.74642 9.09348 2.79981C9.07617 2.81761 9.07617 2.81761 9.05887 2.8354L9.04156 3.06677C8.73008 3.10237 8.41859 3.13796 8.1071 3.20915C6.77462 3.51171 5.59789 4.20581 4.68073 5.20247L4.50768 5.07789H4.47307C4.43846 5.07789 4.40385 5.09569 4.36924 5.09569C4.31732 5.09569 4.26541 5.07789 4.21349 5.0423C3.98853 4.88212 3.76357 4.65075 3.5213 4.38379C3.48669 4.34819 3.45208 4.2948 3.40016 4.2592C3.33094 4.17022 3.26172 4.09903 3.1752 4.01004C3.15789 3.99224 3.12328 3.97444 3.08867 3.93885C3.07137 3.92105 3.05406 3.92105 3.05406 3.90325C2.95024 3.81427 2.8118 3.76087 2.67336 3.76087C2.51761 3.76087 2.36187 3.83206 2.27534 3.95665C2.10229 4.18801 2.15421 4.54397 2.39648 4.75754C2.41378 4.75754 2.41378 4.77533 2.43109 4.77533C2.4657 4.79313 2.483 4.82873 2.51761 4.84652C2.62144 4.91771 2.70797 4.97111 2.8118 5.0245C2.86371 5.0423 2.91563 5.07789 2.96754 5.11349C3.27903 5.30926 3.5386 5.46944 3.74626 5.66521C3.83279 5.7542 3.83279 5.84318 3.83279 5.93217V5.96777L4.00583 6.12794C3.97123 6.18134 3.93662 6.21693 3.91931 6.27033C3.05406 7.67633 2.72527 9.3315 2.95024 10.9689L2.72527 11.0401C2.72527 11.0579 2.70797 11.0579 2.70797 11.0757C2.67336 11.1468 2.62144 11.218 2.51761 11.2714C2.25804 11.3604 1.94655 11.396 1.58315 11.4316H1.56584C1.51393 11.4316 1.44471 11.4316 1.39279 11.4494C1.28896 11.4494 1.18513 11.4672 1.064 11.485C1.02939 11.485 0.99478 11.5028 0.96017 11.5028C0.942865 11.5028 0.925561 11.5028 0.908256 11.5206C0.596767 11.5918 0.406413 11.8943 0.458328 12.1791C0.510243 12.4283 0.735207 12.5884 1.01209 12.5884C1.064 12.5884 1.09861 12.5884 1.15052 12.5706C1.16783 12.5706 1.18513 12.5706 1.18513 12.5529C1.21974 12.5529 1.25435 12.5351 1.28896 12.5351C1.4101 12.4995 1.49662 12.4639 1.60045 12.4105C1.65237 12.3927 1.70428 12.3571 1.7562 12.3393H1.7735C2.10229 12.2147 2.39648 12.1079 2.67336 12.0723H2.70797C2.8118 12.0723 2.88102 12.1257 2.93293 12.1613C2.95024 12.1613 2.95024 12.1791 2.96754 12.1791L3.20981 12.1435C3.62513 13.4605 4.42115 14.6352 5.47675 15.4894C5.71902 15.6852 5.96129 15.8454 6.22086 16.0056L6.11703 16.2369C6.11703 16.2547 6.13434 16.2547 6.13434 16.2725C6.16895 16.3437 6.20356 16.4327 6.16895 16.5573C6.06512 16.8243 5.90938 17.0912 5.71902 17.3938V17.4116C5.68441 17.465 5.6498 17.5006 5.61519 17.554C5.54597 17.6429 5.49406 17.7319 5.42484 17.8387C5.40753 17.8565 5.39023 17.8921 5.37292 17.9277C5.37292 17.9455 5.35562 17.9633 5.35562 17.9633C5.21718 18.2659 5.32101 18.604 5.58058 18.7286C5.6498 18.7642 5.71902 18.782 5.78824 18.782C5.9959 18.782 6.20356 18.6396 6.30739 18.4438C6.30739 18.426 6.32469 18.4082 6.32469 18.4082C6.342 18.3726 6.3593 18.337 6.37661 18.3192C6.42852 18.1947 6.44583 18.1057 6.48044 17.9989C6.49774 17.9455 6.51505 17.8921 6.53235 17.8387C6.65349 17.4828 6.74001 17.198 6.89576 16.9488C6.96498 16.8421 7.0515 16.8243 7.12072 16.7887C7.13802 16.7887 7.13802 16.7887 7.15533 16.7709L7.27646 16.5395C8.03788 16.8421 8.86852 17.0022 9.69915 17.0022C10.201 17.0022 10.7201 16.9488 11.2047 16.8243C11.5162 16.7531 11.8104 16.6641 12.1045 16.5573L12.2084 16.7531C12.2257 16.7531 12.2257 16.7531 12.243 16.7709C12.3295 16.7887 12.3987 16.8243 12.4679 16.931C12.6064 17.1802 12.7102 17.4828 12.8313 17.8209V17.8387C12.8486 17.8921 12.866 17.9455 12.8833 17.9989C12.9179 18.1057 12.9352 18.2125 12.9871 18.3192C13.0044 18.3548 13.0217 18.3726 13.039 18.4082C13.039 18.426 13.0563 18.4438 13.0563 18.4438C13.1601 18.6574 13.3678 18.782 13.5755 18.782C13.6447 18.782 13.7139 18.7642 13.7831 18.7286C13.9042 18.6574 14.0081 18.5506 14.0427 18.4082C14.0773 18.2659 14.0773 18.1057 14.0081 17.9633C14.0081 17.9455 13.9908 17.9455 13.9908 17.9277C13.9735 17.8921 13.9562 17.8565 13.9389 17.8387C13.8869 17.7319 13.8177 17.6429 13.7485 17.554C13.7139 17.5006 13.6793 17.465 13.6447 17.4116V17.3938C13.4543 17.0912 13.2813 16.8243 13.1947 16.5573C13.1601 16.4327 13.1947 16.3615 13.212 16.2725C13.212 16.2547 13.2294 16.2547 13.2294 16.2369L13.1428 16.0234C14.06 15.4716 14.8387 14.6886 15.4271 13.7275C15.7386 13.2292 15.9808 12.6774 16.1539 12.1257L16.3615 12.1613C16.3788 12.1613 16.3788 12.1435 16.3962 12.1435C16.4654 12.1079 16.5173 12.0545 16.6211 12.0545H16.6557C16.9326 12.0901 17.2268 12.1969 17.5556 12.3215H17.5729C17.6248 12.3393 17.6767 12.3749 17.7286 12.3927C17.8325 12.4461 17.919 12.4817 18.0401 12.5173C18.0747 12.5173 18.1093 12.5351 18.1439 12.5351C18.1613 12.5351 18.1786 12.5351 18.1959 12.5529C18.2478 12.5706 18.2824 12.5706 18.3343 12.5706C18.5939 12.5706 18.8188 12.3927 18.8881 12.1613C18.8881 11.9477 18.6977 11.663 18.3862 11.574ZM10.374 10.7019L9.61263 11.0757L8.85121 10.7019L8.66086 9.86543L9.18001 9.18912H10.0279L10.5471 9.86543L10.374 10.7019ZM14.8906 8.85097C15.0291 9.45608 15.0637 10.0612 15.0118 10.6485L12.3641 9.86543C12.1218 9.79423 11.9834 9.54507 12.0353 9.2959C12.0526 9.22471 12.0872 9.15352 12.1391 9.10013L14.233 7.1602C14.5272 7.65853 14.7522 8.22805 14.8906 8.85097ZM13.4024 6.09235L11.1355 7.74752C10.9451 7.8721 10.6855 7.83651 10.5298 7.64073C10.4779 7.58734 10.4606 7.51615 10.4433 7.44496L10.2875 4.54397C11.4816 4.68635 12.5718 5.23807 13.4024 6.09235ZM8.38398 4.63295C8.57433 4.59736 8.74738 4.56176 8.93774 4.52617L8.78199 7.37377C8.76469 7.62294 8.57433 7.83651 8.31476 7.83651C8.24554 7.83651 8.15901 7.81871 8.1071 7.78311L5.80555 6.09235C6.51505 5.36265 7.3976 4.86432 8.38398 4.63295ZM4.97491 7.1602L7.03419 9.04674C7.22455 9.20692 7.24185 9.50947 7.08611 9.70525C7.03419 9.77644 6.96498 9.82983 6.87845 9.84763L4.19619 10.6485C4.09236 9.43828 4.35193 8.21026 4.97491 7.1602ZM4.50768 11.9833L7.25916 11.5028C7.48412 11.485 7.69178 11.6452 7.7437 11.8765C7.761 11.9833 7.761 12.0723 7.72639 12.1613L6.67079 14.7775C5.70172 14.1368 4.923 13.158 4.50768 11.9833ZM10.824 15.525C10.426 15.614 10.0279 15.6674 9.61263 15.6674C9.00696 15.6674 8.41859 15.5606 7.86483 15.3827L9.23192 12.8376C9.37036 12.6774 9.59532 12.6062 9.78568 12.713C9.8722 12.7664 9.94142 12.8376 9.99334 12.9088L11.3258 15.3827C11.1701 15.436 10.997 15.4716 10.824 15.525ZM14.1984 13.0512C13.7658 13.7631 13.1947 14.3326 12.5372 14.7775L11.4469 12.0901C11.395 11.8765 11.4816 11.6452 11.6892 11.5384C11.7584 11.5028 11.845 11.485 11.9315 11.485L14.7003 11.9655C14.5964 12.3571 14.4234 12.713 14.1984 13.0512Z'
      />
    </svg>
  )
}
