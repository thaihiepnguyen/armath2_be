create table user_login_data
(
    user_id    integer                             not null
        constraint user_pk
            primary key,
    email      varchar                             not null,
    password   varchar                             not null,
    is_valid   boolean   default false,
    created_at timestamp default CURRENT_TIMESTAMP not null,
    updated_at timestamp default CURRENT_TIMESTAMP not null
);

alter table user_login_data
    owner to admin;

INSERT INTO public.user_login_data (user_id, email, password, is_valid, created_at, updated_at) VALUES (34, 'nguyennhuphuoc2002@gmail.com', '$2b$07$OhPmy.YctXTpiQjOPiYUS.my5IHVS3VzKFZoDJSegV0RLmjUQhhya', true, '2024-04-17 04:56:41.165597', '2024-04-17 04:57:16.550681');
INSERT INTO public.user_login_data (user_id, email, password, is_valid, created_at, updated_at) VALUES (36, 'nthiep20@clc.fitus.edu.vn', '$2b$07$m0JQQZT448zz4BrCz13xDeXK5aq72ZznVCrbCYXmHN1QV8loxq0KK', true, '2024-04-18 16:48:53.277424', '2024-04-18 16:49:33.761080');
INSERT INTO public.user_login_data (user_id, email, password, is_valid, created_at, updated_at) VALUES (37, 'thaihiep232002@gmail.com', '$2b$07$3QgiRp1HYmQH7alTcT64L.b2rgKIVT3VoEdf1y.RNq3QFfmOp.KGy', false, '2024-04-18 16:54:06.412893', '2024-04-18 16:54:06.412893');
INSERT INTO public.user_login_data (user_id, email, password, is_valid, created_at, updated_at) VALUES (38, 'dbchau10@gmail.com', '$2b$07$NbPZXycZ9eUHyFrY4OE8v.F11EPcmEUTmdO9fD5N59if.Cd4CubAO', true, '2024-04-18 17:04:15.839378', '2024-04-18 17:04:46.911009');
