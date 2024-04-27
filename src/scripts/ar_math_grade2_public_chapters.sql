create table chapters
(
    chapter_id serial
        primary key,
    name       varchar(255),
    semester   integer
);

alter table chapters
    owner to admin;

INSERT INTO public.chapters (chapter_id, name, semester) VALUES (1, '1. Ôn tập và bổ sung', 1);
INSERT INTO public.chapters (chapter_id, name, semester) VALUES (2, '2. Phép cộng, phép trừ qua 10 trong phạm vi 20', 1);
INSERT INTO public.chapters (chapter_id, name, semester) VALUES (3, '3. Phép cộng, phép trừ có nhớ trong phạm vi 100', 1);
INSERT INTO public.chapters (chapter_id, name, semester) VALUES (4, '4. Phép nhân, phép chia', 2);
INSERT INTO public.chapters (chapter_id, name, semester) VALUES (5, '5. Các số đến 1000', 2);
INSERT INTO public.chapters (chapter_id, name, semester) VALUES (6, '6. Phép cộng, phép trừ trong phạm vi 100', 2);
