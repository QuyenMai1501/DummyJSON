## 1. Thời điểm dữ liệu xuất hiện

- **/carts/static**: Dữ liệu có ngay lập tức
- **/carts/dynamic**: Dữ liệu có sau khi server fetch, nhưng client cũng nhận HTML hoàn chỉnh
- **/carts/client**: Dữ liệu phải mất 1 ít thời gian mới xuất hiện


## 2. ISR 60s ảnh hưởng đến /carts/static
-**Refresh < 60s**: dữ liệu không đổi:
-**Refresh > 60s**: Dữ liệu mới

## 3. Tác động cache/no-store:
-**/carts/static**: Fetch 1 lần lúc build, kết quả trả về lưu vào cache trong 60s. Sau 60s thì đổi cache mới.
-**/carts/dynamic: mỗi request = 1 fetch mới, luôn có dữ liệu mới nhất từ dummyjson.com. Chậm và tốn băng thông hơn.

## 4. Trải nghiệm người dùng

**Server Rendering (/static, /dynamic)**:
1. Browser request -> server
2. Server fetch data
3. Server render HTML với data
4. Browser nhận HTML hoàn chỉnh -> **User thấy nội dung ngay lập tức**

**Client Rendering (/client)**:
1. Browser request -> server
2. Server trả HTML trống
3. Browser tải Javascript
4. useEffect chạy -> **User thấy loading skeleton**
5. Fetch API -> wait response.
6. Set state -> **User thấy nội dung**