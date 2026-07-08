--
-- PostgreSQL database dump
--



-- Dumped from database version 17.10 (Debian 17.10-1.pgdg13+1)
-- Dumped by pg_dump version 17.10 (Debian 17.10-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categorias; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.categorias (
    id integer NOT NULL,
    nome character varying(100) NOT NULL,
    descricao text,
    criado_em timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.categorias OWNER TO admin;

--
-- Name: categorias_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.categorias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categorias_id_seq OWNER TO admin;

--
-- Name: categorias_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.categorias_id_seq OWNED BY public.categorias.id;


--
-- Name: produtos; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.produtos (
    id integer NOT NULL,
    nome character varying(255) NOT NULL,
    descricao text,
    categoria_id integer,
    quantidade integer DEFAULT 0,
    imagem character varying(255),
    criado_em timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.produtos OWNER TO admin;

--
-- Name: produtos_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.produtos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.produtos_id_seq OWNER TO admin;

--
-- Name: produtos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.produtos_id_seq OWNED BY public.produtos.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nome character varying(150) NOT NULL,
    email character varying(255) NOT NULL,
    senha character varying(255) NOT NULL,
    role character varying(20) DEFAULT 'usuario'::character varying,
    ativo boolean DEFAULT true,
    criado_em timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    atualizado_em timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.usuarios OWNER TO admin;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO admin;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: categorias id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.categorias ALTER COLUMN id SET DEFAULT nextval('public.categorias_id_seq'::regclass);


--
-- Name: produtos id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.produtos ALTER COLUMN id SET DEFAULT nextval('public.produtos_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: categorias; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.categorias (id, nome, descricao, criado_em) FROM stdin;
20	Ministério Pessoal	\N	2026-07-08 06:52:39.986513
21	Novo Tempo 	\N	2026-07-08 13:35:25.357115
\.


--
-- Data for Name: produtos; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.produtos (id, nome, descricao, categoria_id, quantidade, imagem, criado_em) FROM stdin;
72	A Cura do Pecado 	Revista	21	1	https://mobgdibmbcavthcnxxma.supabase.co/storage/v1/object/public/imagens_produtos/1783517762251-01.png	2026-07-08 13:36:03.377084
73	A Origem de Tudo	Revista	21	1	https://mobgdibmbcavthcnxxma.supabase.co/storage/v1/object/public/imagens_produtos/1783517788993-02.png	2026-07-08 13:36:30.571752
74	A Procura da Verdade	Revista	21	1	https://mobgdibmbcavthcnxxma.supabase.co/storage/v1/object/public/imagens_produtos/1783517831574-03.png	2026-07-08 13:37:13.446428
75	Apocalipse	Revista	21	1	https://mobgdibmbcavthcnxxma.supabase.co/storage/v1/object/public/imagens_produtos/1783517895445-04.png	2026-07-08 13:38:17.116793
76	Bíblia Fácil	Revista	21	1	https://mobgdibmbcavthcnxxma.supabase.co/storage/v1/object/public/imagens_produtos/1783517973376-05.png	2026-07-08 13:39:35.367477
77	Céu ou Inferno 	Revista	21	1	https://mobgdibmbcavthcnxxma.supabase.co/storage/v1/object/public/imagens_produtos/1783518007609-06.png	2026-07-08 13:40:09.206025
78	Profecias de Daniel	Revista	21	1	https://mobgdibmbcavthcnxxma.supabase.co/storage/v1/object/public/imagens_produtos/1783518084326-07.png	2026-07-08 13:41:25.375148
79	Descobrindo Tesouros	Revista	21	1	https://mobgdibmbcavthcnxxma.supabase.co/storage/v1/object/public/imagens_produtos/1783518126848-08.png	2026-07-08 13:42:07.871115
80	Deus me Ouve?	Revista	21	1	https://mobgdibmbcavthcnxxma.supabase.co/storage/v1/object/public/imagens_produtos/1783518200247-09.png	2026-07-08 13:43:22.159351
81	Entre Famílias 	Revista	21	1	https://mobgdibmbcavthcnxxma.supabase.co/storage/v1/object/public/imagens_produtos/1783518263361-10.png	2026-07-08 13:44:24.897769
82	Espírito Santo	Revista	21	1	https://mobgdibmbcavthcnxxma.supabase.co/storage/v1/object/public/imagens_produtos/1783518293251-11.png	2026-07-08 13:44:54.335274
83	Eu Creio	Revista	21	1	https://mobgdibmbcavthcnxxma.supabase.co/storage/v1/object/public/imagens_produtos/1783518331134-12.png	2026-07-08 13:45:32.943602
84	Eu no Universo	Revista	21	1	https://mobgdibmbcavthcnxxma.supabase.co/storage/v1/object/public/imagens_produtos/1783518361303-13.png	2026-07-08 13:46:02.940329
85	Evidências	Revista	21	1	https://mobgdibmbcavthcnxxma.supabase.co/storage/v1/object/public/imagens_produtos/1783518422987-14.png	2026-07-08 13:47:03.999216
86	Incríveis Milagres	Revista	21	1	https://mobgdibmbcavthcnxxma.supabase.co/storage/v1/object/public/imagens_produtos/1783518498429-15.png	2026-07-08 13:48:19.994642
92	A Máquina Humana 	Revista	21	1	https://mobgdibmbcavthcnxxma.supabase.co/storage/v1/object/public/imagens_produtos/1783524078908-16.png	2026-07-08 15:21:20.546437
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.usuarios (id, nome, email, senha, role, ativo, criado_em, atualizado_em) FROM stdin;
1	Menahel	menahel@gmail.com	$2b$10$V/.VuHnzRnQ7pfXJ386sM.NRYL888qXNOfGnurlHvJnNPzQXCv2NW	admin	t	2026-06-02 02:19:38.4823	2026-06-02 02:19:38.4823
\.


--
-- Name: categorias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.categorias_id_seq', 21, true);


--
-- Name: produtos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.produtos_id_seq', 92, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 5, true);


--
-- Name: categorias categorias_nome_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_nome_key UNIQUE (nome);


--
-- Name: categorias categorias_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (id);


--
-- Name: produtos produtos_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.produtos
    ADD CONSTRAINT produtos_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: produtos produtos_categoria_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.produtos
    ADD CONSTRAINT produtos_categoria_id_fkey FOREIGN KEY (categoria_id) REFERENCES public.categorias(id);


--
-- PostgreSQL database dump complete
--

