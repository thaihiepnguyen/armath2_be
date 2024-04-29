create table exercises
(
    exercise_id  serial
        constraint exercises_pk
            primary key,
    lesson_id    integer not null
        constraint exercises_lessons_fk
            references lessons,
    question     varchar not null,
    answer       varchar,
    right_answer varchar,
    type         varchar not null,
    test_id      integer
        constraint exercises_tests_fk
            references tests,
    image_url    varchar
);

comment on column exercises.type is '"ABCD", "DragDrop", "Input"';

alter table exercises
    owner to admin;

INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (30, 1, 'Các số tròn chục đều có chữ số cuối cùng là', null, '0', 'Input', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (24, 61, 'Số liền sau của số tròn chục bé nhất là ?', '11', '11', 'Input', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (25, 61, 'Số liền sau của 97 là ?', '98', '98', 'Input', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (26, 53, '89 = ? + 9', '80', '80', 'Input', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (27, 61, '16,17,(A),19,20,(B),22,23,24. A và B lần lượt là', null, '18,21', 'Input', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (28, 53, 'Chữ số hàng đơn vị của 36 là', null, '6', 'Input', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (29, 53, 'Số tròn chục nhỏ nhất có hai chữ số là', null, '10', 'Input', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (31, 53, 'Số 51 có chữ số hàng chục là', null, '5', 'Input', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (32, 53, 'Bốn mươi sáu là số', null, '46', 'Input', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (33, 53, 'Sáu mươi tư là số', null, '64', 'Input', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (34, 61, 'Số liền trước của 33 là', null, '32', 'Input', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (35, 53, 'Số nhỏ nhất có hai chữ số giống nhau là', null, '11', 'Input', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (4, 1, '61 + 9,53 + 27,42 + 18', '60,70,80', '70,80,60', 'DragDrop', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (5, 1, '22 + 28,48 + 12,23 + 67', '90,50,60', '50,60,90', 'DragDrop', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (6, 1, '37 + 53,11 + 9,24 + 36', '20,60,90', '90,20,60', 'DragDrop', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (7, 1, '85 + 15,14 + 66,11 + 19 ', '30,100,80', '100,80,30', 'DragDrop', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (8, 2, '49 + 34,58 + 23,27 + 67', '94,81,83', '83,81,94', 'DragDrop', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (9, 2, '37 + 46,68 + 7,79 + 16', '75,95,83', '83,75,95', 'DragDrop', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (10, 2, '61 + 16,12 + 67,22 + 59', '81,77,79', '77,79,81', 'DragDrop', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (13, 3, '49 - 9,58 - 28,67 - 57', '10,30,40', '40,30,10', 'DragDrop', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (14, 3, '37 - 17,65 - 15,79 - 19', '50,60,20', '20,50,60', 'DragDrop', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (15, 3, '61 - 21,63 - 13,59 -49', '10,40,50', '40,50,10', 'DragDrop', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (16, 3, '25 - 5,42 - 12,86 - 16', '70,30,20', '20,30,70', 'DragDrop', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (17, 3, '59 - 39,87 - 17,38 - 28', '10,20,70', '20,70,10', 'DragDrop', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (18, 4, '49 - 27,88 - 19,82 - 17', '69,22,65', '22,69,65', 'DragDrop', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (19, 4, '67 - 48,75 - 29,56 - 19', '37,19,46', '19,46,37', 'DragDrop', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (20, 4, '34 - 27,43 - 24,79 -43', '36,7,19', '7,19,36', 'DragDrop', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (21, 4, '57 - 29,97 - 78,86 - 69', '17,19,28', '28,19,17', 'DragDrop', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (22, 4, '24 - 18,74 - 47,68 - 29', '24,6,39', '6,24,39', 'DragDrop', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (11, 2, '25 + 58,17 + 48,28 + 48', '65,83,76', '83,65,76', 'DragDrop', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (12, 2, '37 + 14,17 + 49,38 + 47', '65,83,76', '51,66,85', 'DragDrop', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (1, 1, '12 + 8,12 + 28,16 + 44', '40,60,20', '20,40,60', 'DragDrop', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (23, 2, '37 + 14 = ?', '51,52,53,54', '51', 'MultipleChoice', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (52, 59, 'Sau khi cho Nam 13 cái kẹo thì số kẹo của Huy là số liền sau của số nhỏ nhất có hai chữ số. Vậy lúc đầu Huy có bao nhiêu cái kẹo ?', null, '24', 'Input', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (36, 53, 'Số hai chữ số giống nhau và khi cộng chữ số hàng chục và chữ số hàng đơn vị ta được kết quả là 6 là', null, '33', 'Input', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (37, 61, 'Số lẻ nhỏ hơn 28 và lớn hơn 25 là', null, '27', 'Input', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (38, 61, 'Số liền trước số lớn nhất có một chữ số là', null, '8', 'Input', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (39, 57, 'Cho các số 47, 35, 66, 28, 19. Hỏi số nào sau khi lấy số đó trừ đi hàng đơn vị ra kết quả là số liền sau của số lớn nhất có một chữ số ?', null, '19', 'Input', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (40, 59, 'Lan và Mai mỗi bạn viết 1 số có 2 chữ số. Thật kì lạ khi quay ngược số hàng đơn vị của Lan viết thì được số hàng đơn vị của Mai viết. Biết rằng chữ số hàng đơn vị Lan viết lớn hơn chữ số hàng đơn vị Mai viết. Và chữ số hàng chục của hai số đều là số liền trước của chữ số hàng đơn vị. Hỏi Lan đã viết số nào ?', null, '89', 'Input', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (41, 61, 'Cho số bé nhất có hai chữ số mà tổng hai chữ số bằng 7. Số liền trước của số đã cho là', null, '15', 'Input', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (42, 56, 'Có bao nhiêu số có 2 chữ số sao cho tổng của hai chữ số bằng 9', null, '9', 'Input', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (43, 53, 'Cho dãy số 79,?,75,73,71. Số ? là số', null, '77', 'Input', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (44, 53, 'Có tất cả bao nhiêu số có hai chữ số mà nếu ta thêm 4 vào cả chữ số hàng chục và chữ số hàng đơn vị thì số đó vnẫ nhỏ hơn số liền trước của 59?', null, '4', 'Input', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (45, 56, 'Số lớn nhất có hai chữ số mà tổng hai chữ số bằng 10 là', null, '91', 'Input', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (46, 59, 'Số ghế trong kho là một số có hai chữ số mà có số liền sau là số lớn nhất có hai chữ số. Nhà trường lấy ra số ghế là số tròn chục liền trước của 50. Hỏi trong kho còn lại bao nhiêu cái ghế?', null, '58', 'Input', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (48, 53, 'Từ các số 0,3,7 ta có thể lập được tất cả bao nhiêu số có hai chữ số?', null, '6', 'Input', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (50, 61, 'Từ các số 1,3,4 ta có thể lập ra được tất cả các số có hai chữ số và sắp xếp theo thứ tự từ bé đến lớn. Số liền sau của số thứ 4 trong dãy số (tính từ trái sang phải) là số mấy?', null, '32', 'Input', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (47, 59, 'Buổi sáng cửa hàng bán được số quyển vở là số tròn chục liền sau của số tròn chục nhỏ nhất. Số quyển vở buổi chiều cửa hàng bán được là số có hai chữ số giống nhau. Biết chữ số hàng chục của số quyển vở bán buổi sáng tăng thêm 4 thì được chữ số hàng đơn vị của số quyển vở bán buổi chiều. Hỏi số quyển vở cửa hàng bán được trong cả hai buổi là bao nhiêu?', null, '86', 'Input', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (51, 61, 'Số liền sau của số mà liền trước của nó là số chẵn lớn nhất có hai chữ số là ?', null, '100', 'Input', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (49, 59, 'Có tất cả bao nhiêu số có hai chữ số mà khi đổi ngược vị trí của hàng chục và hàng đơn vị của số đó lại ta không thu được một số có hai chữ số?', null, '9', 'Input', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (53, 2, '12 + 5 = ?', '15, 16, 17, 18', '17', 'MultipleChoice', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (54, 2, '19 + 28 = ?', '46, 47, 48, 49', '47', 'MultipleChoice', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (55, 2, '42 + 33 = ?', '75, 76, 77, 78', '75', 'MultipleChoice', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (56, 2, '48 + 15 = ?', '73, 62, 63, 64', '63', 'MultipleChoice', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (57, 2, '36 + 7 = ?', '41, 42, 43, 44', '43', 'MultipleChoice', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (58, 4, '93 - 38 = ?', '55, 56, 57, 58', '55', 'MultipleChoice', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (59, 4, '77 - 19 = ?', '56, 57, 58, 59', '58', 'MultipleChoice', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (60, 4, '84 - 35 = ?', '49, 50, 51, 52', '49', 'MultipleChoice', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (61, 4, '79 - 12 = ?', '65, 66, 67, 68', '67', 'MultipleChoice', null, null);
INSERT INTO public.exercises (exercise_id, lesson_id, question, answer, right_answer, type, test_id, image_url) VALUES (62, 4, '96 - 49 = ?', '47, 48, 49, 50', '47', 'MultipleChoice', null, null);
