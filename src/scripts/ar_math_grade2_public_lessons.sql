create table lessons
(
    lesson_id  integer default nextval('lesson_lesson_id_seq'::regclass) not null
        constraint lesson_pk
            primary key,
    name       varchar                                                   not null,
    video_url  varchar,
    book_url   varchar,
    ar_url     varchar,
    chapter_id integer
        constraint fk_lessons_chapters
            references chapters
);

alter table lessons
    owner to admin;

INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (2, 'Phép cộng có nhớ trong phạm vi 100', 'https://www.youtube.com/watch?v=EAW2lZ0Mt4Q', null, null, 3);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (3, 'Phép trừ có số bị trừ là số tròn chục', 'https://www.youtube.com/watch?v=4ZcFEJXnqGw', null, null, 3);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (4, 'Phép trừ có nhớ trong phạm vi 100', 'https://www.youtube.com/watch?v=eFYaOlllGu8', null, null, 3);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (1, 'Phép cộng có tổng là số tròn chục', 'https://www.youtube.com/watch?v=7OA-auXOwLo', null, null, 3);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (6, 'Biểu đồ tranh', 'https://www.youtube.com/watch?v=izYVNVR5qqU', null, null, 3);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (7, 'Có thể, chắc chắn, không thể', 'https://www.youtube.com/watch?v=EqyfZCqmbHE', null, null, 3);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (8, 'Ngày, giờ', 'https://www.youtube.com/watch?v=0MNwa7IuoAA', null, null, 3);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (9, 'Ngày, tháng', 'https://www.youtube.com/watch?v=dRmCmlZiQzs', null, null, 3);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (10, 'Phép cộng không nhớ trong phạm vi 1000', 'https://www.youtube.com/watch?v=0RMgoh4mGVs', null, null, 6);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (11, 'Phép trừ không nhớ trong phạm vi 1000', 'https://www.youtube.com/watch?v=FOijeh8dmwo', null, null, 6);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (12, 'Nặng hơn, nhẹ hơn', 'https://www.youtube.com/watch?v=y-okzhFfOJQ', null, null, 6);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (13, 'Ki-lô-gam', 'https://www.youtube.com/watch?v=6y3OCNegAR0', null, null, 6);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (14, 'Phép cộng có nhớ trong phạm vi 1000', 'https://www.youtube.com/watch?v=eixrkc9YI28', null, null, 6);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (15, 'Phép trừ có nhớ trong phạm vi 1000', 'https://www.youtube.com/watch?v=EvmFoh26dio', null, null, 6);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (16, 'Tiền Việt Nam', 'https://www.youtube.com/watch?v=gVJ0lUK0KgI', null, null, 6);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (41, 'Thực hành và trải nghiệm', 'https://www.youtube.com/watch?v=_CAKbdzTYBY&list=PLPUZuj69QZud6uJIxxplTD4KtkuSxGWh0&index=34', null, null, 2);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (40, 'Em làm được những gì? phần 2 tiết 2', 'https://www.youtube.com/watch?v=IyCDHKhsgsY&list=PLPUZuj69QZud6uJIxxplTD4KtkuSxGWh0&index=33', null, null, 2);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (39, 'Em làm được những gì? phần 2 tiết 1', 'https://www.youtube.com/watch?v=pWfI5ASCz0M&list=PLPUZuj69QZud6uJIxxplTD4KtkuSxGWh0&index=32', null, null, 2);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (36, 'Đựng nhiều nước, đựng ít nước', 'https://www.youtube.com/watch?v=2IxdLppceHc&list=PLPUZuj69QZud6uJIxxplTD4KtkuSxGWh0&index=30', null, null, 2);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (35, 'Bài toán ít hơn', 'https://www.youtube.com/watch?v=UDK7NRGpw5k&list=PLPUZuj69QZud6uJIxxplTD4KtkuSxGWh0&index=29', null, null, 2);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (34, 'Bài toán nhiều hơn', 'https://www.youtube.com/watch?v=YZ8Yl8UcgqA&list=PLPUZuj69QZud6uJIxxplTD4KtkuSxGWh0&index=28', null, null, 2);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (33, 'Em giải bài toán', 'https://www.youtube.com/watch?v=graYsd9logY&list=PLPUZuj69QZud6uJIxxplTD4KtkuSxGWh0&index=27', null, null, 2);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (32, 'Bảng trừ tiết 1', 'https://www.youtube.com/watch?v=UPcK-s_fsVg&list=PLPUZuj69QZud6uJIxxplTD4KtkuSxGWh0&index=25', null, null, 2);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (38, 'Bảng trừ tiết 2', 'https://www.youtube.com/watch?v=UV6ecRtY2IA&list=PLPUZuj69QZud6uJIxxplTD4KtkuSxGWh0&index=26', null, null, 2);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (31, '14, 15, 16, 17, 18 trừ đi một số', 'https://www.youtube.com/watch?v=DR9yuhujx-8&list=PLPUZuj69QZud6uJIxxplTD4KtkuSxGWh0&index=24', null, null, 2);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (30, '13 trừ đi một số', 'https://www.youtube.com/watch?v=fGqK_lp4EKQ&list=PLPUZuj69QZud6uJIxxplTD4KtkuSxGWh0&index=23', null, null, 2);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (28, '11 trừ đi một số', 'https://www.youtube.com/watch?v=mjjVjRVOwO0&list=PLPUZuj69QZud6uJIxxplTD4KtkuSxGWh0&index=21', null, null, 2);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (29, '12 trừ đi một số', 'https://www.youtube.com/watch?v=SCprrkwvGpo&list=PLPUZuj69QZud6uJIxxplTD4KtkuSxGWh0&index=22', null, null, 2);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (27, 'Phép trừ có hiệu bằng 10', 'https://www.youtube.com/watch?v=8vhkNNmAnvQ&list=PLPUZuj69QZud6uJIxxplTD4KtkuSxGWh0&index=20', null, null, 2);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (26, 'Em làm được những gì?', 'https://www.youtube.com/watch?v=wGICxQGpK34&list=PLPUZuj69QZud6uJIxxplTD4KtkuSxGWh0&index=19', null, null, 2);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (25, 'Ba điểm thẳng hàng', 'https://www.youtube.com/watch?v=-uoUhStyQE4&list=PLPUZuj69QZud6uJIxxplTD4KtkuSxGWh0&index=18', null, null, 2);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (23, 'Đường thẳng - Đường cong', 'https://www.youtube.com/watch?v=MefFcdBJpb0&list=PLPUZuj69QZud6uJIxxplTD4KtkuSxGWh0&index=16', null, null, 2);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (37, 'Lít', 'https://www.youtube.com/watch?v=kXgdD6UJDq8&list=PLPUZuj69QZud6uJIxxplTD4KtkuSxGWh0&index=31', null, null, 2);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (24, 'Đường gấp khúc.', 'https://www.youtube.com/watch?v=rwIdA8GqOG8&list=PLPUZuj69QZud6uJIxxplTD4KtkuSxGWh0&index=17', null, null, 2);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (22, 'Bảng cộng tiết 2', 'https://www.youtube.com/watch?v=9qz1MSruM1w&list=PLPUZuj69QZud6uJIxxplTD4KtkuSxGWh0&index=15', null, null, 2);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (21, 'Bảng cộng tiết 1', 'https://www.youtube.com/watch?v=uUKQc3N5160&list=PLPUZuj69QZud6uJIxxplTD4KtkuSxGWh0&index=14', null, null, 2);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (20, '7 cộng với một số, 6 cộng với một số', 'https://www.youtube.com/watch?v=RiDainFDXyg&list=PLPUZuj69QZud6uJIxxplTD4KtkuSxGWh0&index=13', null, null, 2);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (19, '8 cộng với một số', 'https://www.youtube.com/watch?v=rQw0_jKrewk&list=PLPUZuj69QZud6uJIxxplTD4KtkuSxGWh0&index=12', null, null, 2);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (18, '9 cộng với một số', 'https://www.youtube.com/watch?v=rQw0_jKrewk&list=PLPUZuj69QZud6uJIxxplTD4KtkuSxGWh0&index=12', null, null, 2);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (17, 'Phép cộng có tổng bằng 10', 'https://www.youtube.com/watch?v=nKcnsksmmfY&list=PLPUZuj69QZud6uJIxxplTD4KtkuSxGWh0&index=11', null, null, 2);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (52, 'Xếp hình gấp hình', 'https://youtu.be/DC7AyrhsxZo?si=dCVnIOmR9_wkq12V', null, null, 5);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (51, 'Hình tứ giác', 'https://youtu.be/Se1-JaSM6yA?si=_NmXsN-EAHB0mjkM', null, null, 5);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (50, 'Khối trụ khối cầu', 'https://youtu.be/l8jm5BKlYpI?si=ZfD0ahGNpFymnUBz', null, null, 5);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (49, 'Ki lô mét', 'https://youtu.be/kE-osJB2ee8?si=k6XHnvCnh7RQyaE_', null, null, 5);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (48, 'Mét', 'https://youtu.be/Yy5RMWYGWqM?si=_WtVHfXxaHH9u7K5', null, null, 5);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (47, 'So sánh các số có ba chữ số', 'https://youtu.be/qUHssvYW68U?si=z9goBf3iY9YCThJg', null, null, 5);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (46, 'Viết số thành tổng các trăm chục đơn vị', 'https://youtu.be/fR1Avf1B2VY?si=jRvqZG6iSQkvcDNI', null, null, 5);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (45, 'Các số có ba chữ số', 'https://youtu.be/F9evWg4bQ7I?si=JunxFUCDWXDHkLkR', null, null, 5);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (44, 'Các số từ 111 đến 200', 'https://youtu.be/MlKhm_vKdUs?si=CiRoxl5rY_h_Awca', null, null, 5);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (43, 'Các số từ 101 đến 110', 'https://youtu.be/IQp0_kbjhPk?si=UJKL946kDzpQHEcM', null, null, 5);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (42, 'Đơn vị chục, trăm, nghìn', 'https://youtu.be/_lDxymnuHuA?si=_J19L9OXae5ZNHkE', null, null, 5);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (63, 'Em làm được những gì?', 'https://www.youtube.com/watch?v=-7BJpIQ4WWg', null, null, 1);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (62, 'Đề-xi-mét', 'https://www.youtube.com/watch?v=K5zTMCBxUsM', null, null, 1);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (61, 'Tia số - Số liền trước, số liền sau', 'https://www.youtube.com/watch?v=qQEsV-rs9uU', null, null, 1);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (60, 'Điểm - Đoạn thẳng', 'https://www.youtube.com/watch?v=Zbuffa1VcFo', null, null, 1);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (59, 'Em làm được những gì?', 'https://www.youtube.com/watch?v=iV_ouS3jSIc', null, null, 1);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (58, 'Nhiều hơn hay ít hơn bao nhiêu', 'https://www.youtube.com/watch?v=Cd--Gj7ulz8', null, null, 1);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (57, 'Số bị trừ - Số trừ - Hiệu', 'https://www.youtube.com/watch?v=bPj5vPa8XuY', null, null, 1);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (56, 'Số hạng - Tổng', 'https://www.youtube.com/watch?v=oyzujza2MYU', null, null, 1);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (54, 'Ước lượng', 'https://www.youtube.com/watch?v=HrGKSi-L8uQ', null, null, 1);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (53, 'Ôn tập các số đến 100', 'https://www.youtube.com/watch?v=s_kx9xsOMxA', null, null, 1);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (73, 'Giờ, phút, xem đồng hồ', 'https://www.youtube.com/watch?v=FABrWKu-110', null, null, 4);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (72, 'Bảng chia 5', 'https://www.youtube.com/watch?v=9BZCrsP-QPY', null, null, 4);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (71, 'Bảng chia 2', 'https://www.youtube.com/watch?v=VqY64YJSTUM', null, null, 4);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (70, 'Số bị chia - số chia - thương', 'https://www.youtube.com/watch?v=pAQ7HhjIm0A', null, null, 4);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (69, 'Phép chia', 'https://www.youtube.com/watch?v=rllH8MucvSw', null, null, 4);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (68, 'Bảng nhân 5', 'https://www.youtube.com/watch?v=JPT3a014Mas', null, null, 4);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (67, 'Bảng nhân 2', 'https://www.youtube.com/watch?v=35BiygOSLRs', null, null, 4);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (66, 'Thừa số - tích', 'https://www.youtube.com/watch?v=3hAlblOgWzs', null, null, 4);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (64, 'Tổng các số hạng bằng nhau', 'https://www.youtube.com/watch?v=rhNTikRvezM', null, null, 4);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (65, 'Phép nhân', 'https://www.youtube.com/watch?v=HilpedMZ_FA', null, null, 4);
INSERT INTO public.lessons (lesson_id, name, video_url, book_url, ar_url, chapter_id) VALUES (5, 'Thu thập, phân loại, kiểm đếm', 'https://www.youtube.com/watch?v=iviGU79hGDo', null, null, 3);
