# Các phần đã sửa

1. Bên role user, mục "Đấu ghép đã đăng ký" không còn mở nhầm sang chi tiết buổi đánh giá nữa.
   - Đã thêm màn `player-matchmaking-detail`.
   - Khi bấm vào buổi đấu ghép đã đăng ký, app sẽ mở `PlayerMatchmakingDetailScreen`.

2. Sau khi owner bấm "Xếp trận từ danh sách đăng ký", bên user sẽ thấy:
   - Trận đấu của tôi
   - Đối thủ / đội đối thủ
   - Sân thi đấu
   - Ngày giờ, địa điểm
   - Danh sách tất cả trận trong buổi đấu ghép

3. Sửa phần render danh sách trận trong chi tiết đấu ghép của user.
   - Trước đó code đang đọc sai field kiểu `p1Name`, `p2Name`.
   - Đã đổi sang đúng cấu trúc `team1`, `team2`.

4. Sửa thêm dữ liệu mock trận so tài Tennis thiếu `format`.

5. Bổ sung lại các thư mục asset tên tiếng Việt để project build được bằng Vite.

Đã test bằng:

```bash
npm install
npm run build
```

Kết quả: build thành công.
