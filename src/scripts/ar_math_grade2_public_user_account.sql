create table user_account
(
    user_id    integer   default nextval('"User_id_seq"'::regclass) not null
        constraint user_login_data_pk
            primary key,
    name       varchar                                              not null,
    email      varchar                                              not null,
    eventpoint integer   default 0                                  not null,
    star       integer   default 0                                  not null,
    created_at timestamp default CURRENT_TIMESTAMP                  not null,
    updated_at timestamp default CURRENT_TIMESTAMP                  not null
);

alter table user_account
    owner to admin;

INSERT INTO public.user_account (user_id, name, email, eventpoint, star, created_at, updated_at) VALUES (34, 'preventivecaptain743', 'nguyennhuphuoc2002@gmail.com', 0, 0, '2024-04-17 04:56:41.125876', '2024-04-17 04:56:41.125876');
INSERT INTO public.user_account (user_id, name, email, eventpoint, star, created_at, updated_at) VALUES (36, 'unkemptpipeline827', 'nthiep20@clc.fitus.edu.vn', 0, 0, '2024-04-18 16:48:53.242076', '2024-04-18 16:48:53.242076');
INSERT INTO public.user_account (user_id, name, email, eventpoint, star, created_at, updated_at) VALUES (37, 'stolencondenser137', 'thaihiep232002@gmail.com', 0, 0, '2024-04-18 16:54:06.380938', '2024-04-18 16:54:06.380938');
INSERT INTO public.user_account (user_id, name, email, eventpoint, star, created_at, updated_at) VALUES (38, 'provisionaltrapper117', 'dbchau10@gmail.com', 0, 0, '2024-04-18 17:04:15.795431', '2024-04-18 17:04:15.795431');
