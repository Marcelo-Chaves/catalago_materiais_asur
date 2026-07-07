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
12	Revista	\N	2026-07-06 19:23:44.567886
14	Manual	\N	2026-07-06 20:06:38.830556
15	Cartao de chamada	\N	2026-07-06 20:09:22.308959
16	Biblia	\N	2026-07-06 20:10:59.570136
19	Estudo biblico 	\N	2026-07-06 20:17:45.39556
\.


--
-- Data for Name: produtos; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.produtos (id, nome, descricao, categoria_id, quantidade, imagem, criado_em) FROM stdin;
24	A Origem de Tudo	Novo tempo 	12	1	1783366079422-794869803.png	2026-07-06 19:28:01.163941
25	A Procura da Felicidade 	Novo Tempo 	12	1	1783366133215-714710187.png	2026-07-06 19:28:55.119648
26	A Cura do Pecado 	Novo Tempo 	12	1	1783367174083-946764533.png	2026-07-06 19:46:14.247858
27	Céu ou Inferno 	Novo Tempo 	12	1	1783367291965-630952768.png	2026-07-06 19:48:12.024879
28	Estudo Bliblia Fácil 	Novo Tempo 	12	1	1783367344999-654057504.png	2026-07-06 19:49:05.070083
29	Profecias de Danial 	Novo Tempo 	12	1	1783367402076-506737176.png	2026-07-06 19:50:03.769901
30	Descobrindo Tesouros 	Novo Tempo 	12	1	1783367448297-894022078.png	2026-07-06 19:50:48.351318
31	Deus me Ouve ?	Novo Tempo 	12	1	1783367496871-770335153.png	2026-07-06 19:51:38.617586
32	Entre Familias 	Novo tempo 	12	1	1783367540542-537953694.png	2026-07-06 19:52:20.581742
33	Espirito Santo 	Novo Tempo 	12	1	1783367712475-359063755.png	2026-07-06 19:55:14.084055
34	Eu Creio 	Novo Tempo 	12	1	1783367749103-51579103.png	2026-07-06 19:55:49.17358
35	Eu no Universo 	Novo Tempo 	12	1	1783367781902-967825369.png	2026-07-06 19:56:21.963121
36	Evidências 	Novo Tempo 	12	1	1783367817180-152299983.png	2026-07-06 19:56:57.247087
37	Incriveis Milagres 	Novo Tempo 	12	1	1783367861488-696765708.png	2026-07-06 19:57:43.03649
38	A Máquina Humana 	Novo Tempo 	12	1	1783367890190-876397187.png	2026-07-06 19:58:10.257045
39	Mente Feliz 	Novo Tempo 	12	1	1783367941323-855448191.png	2026-07-06 19:59:01.382292
40	Na Mira da Verdade 	Novo Tempo 	12	1	1783367968899-465045727.png	2026-07-06 19:59:28.953072
41	O Sábado da Criação 	Novo Tempo 	12	1	1783368019267-10776840.png	2026-07-06 20:00:20.947658
42	Pais Preparados Filhos de Carater 	Novo Tempo 	12	1	1783368050448-932374788.png	2026-07-06 20:00:50.514567
43	O dia em que o mundo não acabou 	Novo Tempo 	12	1	1783368153809-362341009.png	2026-07-06 20:02:33.856126
44	Sem Tabús	Novo Tempo 	12	1	1783368194741-628778824.png	2026-07-06 20:03:14.80665
45	Sentimentos 	Novo tempo 	12	1	1783368241957-873071449.png	2026-07-06 20:04:03.550265
46	Super Lupa 	Novo Tempo 	12	1	1783368287300-667254190.png	2026-07-06 20:04:47.380713
47	Verdades para o Tempo do Fim 	Novo Tempo 	12	1	1783368327834-93841127.png	2026-07-06 20:05:27.88993
48	Ministério Pessoal - Guia do Diretor	Livro	14	1	1783368433368-489966012.png	2026-07-06 20:07:13.411845
49	Persuação 	Evangelismo 	14	1	1783368491669-979671672.png	2026-07-06 20:08:13.393916
50	Cartão de Chamada Escola Sabatina 	Escola Sabatina 	15	1	1783368596836-208526695.png	2026-07-06 20:09:56.879435
51	Biblia Missionária - Batismo 	MIPES	16	1	1783368691678-47077985.jpg	2026-07-06 20:11:31.723383
55	Bilbia Ouvindo a Voz de Deus C/Estudo	MIPES	16	1	1783368934399-470061111.jpg	2026-07-06 20:15:36.099856
56	Estudo Biblico Ouvindo a Voz de Deus 	MIPES	19	1	1783369134582-39523290.jpg	2026-07-06 20:18:54.628484
57	Ensinos de Jesus 	MIPES	12	1	1783369205424-102549482.jpg	2026-07-06 20:20:07.024453
61	Apocalipse Revelações de Esperança 	MIPES	12	1	1783369428202-804049163.jpg	2026-07-06 20:23:48.256748
62	Curso para Duplas Missionárias 	MIPES	14	1	1783369503426-449556089.jpg	2026-07-06 20:25:03.47566
63	Dicipulados - Guia de estudos biblicos  NT	MIPES	14	1	1783369606308-178107688.jpg	2026-07-06 20:26:46.36865
64	Pesquisa de Opinião	MIPES	14	1	1783369659087-573353982.jpg	2026-07-06 20:27:40.669519
65	Biblia capa preta 	MIPES	16	1	1783369714807-316159598.jpeg	2026-07-06 20:28:34.860057
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

SELECT pg_catalog.setval('public.categorias_id_seq', 19, true);


--
-- Name: produtos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.produtos_id_seq', 65, true);


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



