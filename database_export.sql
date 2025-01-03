PGDMP                        |            verceldb    16.6    16.3                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16389    verceldb    DATABASE     j   CREATE DATABASE verceldb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE verceldb;
                default    false                       0    0    DATABASE verceldb    ACL     2   GRANT ALL ON DATABASE verceldb TO neon_superuser;
                   default    false    3357                        3079    24576 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false                       0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    2            �            1259    57354    posts    TABLE     )  CREATE TABLE public.posts (
    id integer NOT NULL,
    user_id character varying(255),
    title character varying(255) NOT NULL,
    "position" character varying(255),
    content text,
    difficulty character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.posts;
       public         heap    default    false            �            1259    57353    posts_id_seq    SEQUENCE     �   CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.posts_id_seq;
       public          default    false    217                        0    0    posts_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;
          public          default    false    216            �            1259    73739    saved_posts    TABLE     �   CREATE TABLE public.saved_posts (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id character varying(255) NOT NULL,
    post_id integer NOT NULL,
    saved_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.saved_posts;
       public         heap    default    false    2            {           2604    57357    posts id    DEFAULT     d   ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);
 7   ALTER TABLE public.posts ALTER COLUMN id DROP DEFAULT;
       public          default    false    217    216    217                      0    57354    posts 
   TABLE DATA           `   COPY public.posts (id, user_id, title, "position", content, difficulty, created_at) FROM stdin;
    public          default    false    217   J                 0    73739    saved_posts 
   TABLE DATA           E   COPY public.saved_posts (id, user_id, post_id, saved_at) FROM stdin;
    public          default    false    218   c       !           0    0    posts_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.posts_id_seq', 30, true);
          public          default    false    216            �           2606    57362    posts posts_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.posts DROP CONSTRAINT posts_pkey;
       public            default    false    217            �           2606    73745    saved_posts saved_posts_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.saved_posts
    ADD CONSTRAINT saved_posts_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.saved_posts DROP CONSTRAINT saved_posts_pkey;
       public            default    false    218            �           2606    73747 +   saved_posts saved_posts_user_id_post_id_key 
   CONSTRAINT     r   ALTER TABLE ONLY public.saved_posts
    ADD CONSTRAINT saved_posts_user_id_post_id_key UNIQUE (user_id, post_id);
 U   ALTER TABLE ONLY public.saved_posts DROP CONSTRAINT saved_posts_user_id_post_id_key;
       public            default    false    218    218            �           2606    73748 $   saved_posts saved_posts_post_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.saved_posts
    ADD CONSTRAINT saved_posts_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id);
 N   ALTER TABLE ONLY public.saved_posts DROP CONSTRAINT saved_posts_post_id_fkey;
       public          default    false    217    3200    218                       826    16391     DEFAULT PRIVILEGES FOR SEQUENCES    DEFAULT ACL     {   ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;
          public          cloud_admin    false                       826    16390    DEFAULT PRIVILEGES FOR TABLES    DEFAULT ACL     x   ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;
          public          cloud_admin    false               	  x��W�n�F]3_q�-��!)���"�N�8�� ňI��Pȡe��y ��E�4A�f������ޡeIv
��mQ�y����s��*e�O�'G�wn����7#��pw���}b�q\���$�g2%KeE���؀0O'���lg���"S%���N�Edp�;W-�*s����n�]�|�;˺�^�`��y
j,a2�3	�f�$P*�T�L�	BjW�ǲ�A�N�B!F���}���6%�6��N����X�ɺ����v.�+�PH�A���d�ġPq�äR�%�S	��E^�0I��EJ��B�H�|Z.�� �y��P��Hb8p��P��� ��]��^��{k$�g�%�%�IU�+�,`b��Hd��q:���x�阳"��F��|Rw������0���"V3ȇ�WL�<�B$�jF�+��&�<����]��9=�q��^��W>�Ŷ�7��[ۚ��q>0�f2m�m�N�(%$RA*!���rv�T�63}��V�N�/�=
��iO������Fa�"ʤq�b�������er
C�SUH̧U9(1�bc�0��|�sɬ�Q�*�I7P#�x*��dpn�����m��纞�c��l�\���!��$G6 ;��
���;�m�5}�vO�o�!��NF��xFA�EB(ƶ�n�o�����54�����꿚��h^A�[�~������O���8�yޜ�T,?`肶�p�ݎ�:���׳���"�6����у]��@�ϊ
�L���sŭh���A�̨)Y�C�30�j�n�x:����Nuf�����}M�Í�=�n{w��g��Q�I����FF����p�Շ���N� �;�|�cl�H!D뢈�9
�U���H!M@�6}!~�m��<��C?�����	1D�jj�ESk����<�O�͏��wf�K�5͛6P�kc��r�<�r	Ĳh��,΋3��穤"Bv�N�yHQ�xX%��
V	�,�IF1���ѷ���p��:��������CG��n�Vr���n�7ng?��	�Z��h����@������R�+����3n��#d���b	GS�Ldp�i�9�G�yYl^B��~WB���I��d������c�X�	�k��\�����g>��B�k��`���(��g�?�,��7�[G�����*O4�t;>����=����{�؎T�ԜӼ8A�H�Ք�{�9e��7��@K���ј�Ń�R�i�XG��7��x]]��%~#�����W�qa)^�O�4�J�ƨV��I+�v�6(W�\j��[V��݅���[�2/59m)�Jp�z����#�l�ڇ|�|N�/�s"F�Ӷ����LIly�9R� mP\섗��~.7x_�='��!u��ɝ�c�<\Cc�Ӫ,V�n��T�%ZUK2�쵆��6�t�J~1j�����a3�����F�q]`%�HfeL}�qw�D�i`�"��\m�"*�o��$���H�Yh ���"��P`}���ȼr�ʿ��R         �  x����NSA�랧��d���}�
��
jjL���JM������/����6�R�T0�b3\M�)�%#�ir��7��j=��r��8<��Et:;��=�t��ƪA��^ԣ��I*�$å%�2�i�q�Ec�k������jVۯ_ȯ.e���~`(�ɓ�"Z�>Ch�41�k� 5'�����b�a���nVoO�w?֜�g�_#����@���(E�S�f���Ev^���Z{�q�ؖ�|{	K9�z�Z�������	�o�/a�v�ң��rEr���f�L�H����I	%���ԫ���9�V�G��9��	�D�9��E�Z����ǿQ��w9S1�(�Y�I�Y#ѧL��%���el�Q�Ak�B7�,&�X���q�����l��c��l?n
.t�ͫ/:^&7��:
�	��'������ϫ�^ݾǣ�|�>��	�g���0�1 ���w���~i��     