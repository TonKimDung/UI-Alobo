# Refactor ghi chú

Đã refactor lại project từ file `src/app/App.tsx` lớn thành nhiều file nhỏ hơn, giữ nguyên UI và logic hiện tại.

## Cấu trúc chính

- `src/app/App.tsx`: state chính + điều hướng màn hình
- `src/app/shared.tsx`: types, constants, seed data, helper functions, shared UI components
- `src/screens/AuthScreens.tsx`: đăng nhập / đăng ký
- `src/screens/OwnerSessionScreens.tsx`: các màn quản lý buổi đánh giá của chủ sân
- `src/screens/PlayerSessionScreens.tsx`: các màn buổi đánh giá của người chơi
- `src/screens/PlayerMatchScreens.tsx`: các màn đấu ghép / thách đấu của người chơi
- `src/screens/OwnerMatchScreens.tsx`: các màn đấu ghép của chủ sân
- `src/screens/ProfileScreen.tsx`: hồ sơ

## Kiểm tra

Đã chạy thành công:

```bash
npm run build
```

## Chạy project

```bash
npm install
npm run dev
```
