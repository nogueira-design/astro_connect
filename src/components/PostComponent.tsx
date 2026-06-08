import React, { useState } from 'react';
import { Post, Comment } from '../types';

const POST_TRANSLATIONS: Record<string, {
  content: string;
  location: string;
  imageLabel?: string;
  role: string;
}> = {
  'post-1': {
    content: "Capturei este amanhecer espetacular sobre a cordilheira dos Andes durante minha rotina de exercícios matinais. Olhando de perto, as calotas polares nos picos do sul mostram uma nova redução em comparação com nossos arquivos de telemetria da última década. O monitoramento da saúde planetária é crucial. Nossos sensores mostram mudanças de vapor de água sobre o Pacífico Sul que precisamos estudar. A telemetria sugere que estaremos sobre o Pacífico em 14 minutos.",
    location: "EEI - Órbita Baixa da Terra (Órbita 14.289)",
    imageLabel: "4K RAW • Nikon Z9 Mod Espacial",
    role: "Comandante"
  },
  'post-2': {
    content: "Recebi o feed de imagens multiespectrais do Comandante Miller. Nossos pipelines automatizados de machine learning processaram os dados brutos. As anomalias de assinatura térmica confirmam um aumento de 2,4% na velocidade do escoamento de inverno nas sub-bacias andinas. Isso ajudará as agências agrícolas locais na Terra a preparar modelos sustentáveis de gestão de irrigação. Infraestrutura tecnológica aeroespacial em ação!",
    location: "Centro de Observação Climática de Genebra, Terra",
    role: "Analista de Clima"
  },
  'post-3': {
    content: "A análise espectral inicial das amostras principais do Setor Marciano 4-B indica uma concentração excepcionalmente alta de camadas de matriz de silicato-perovskita. Essa estrutura apoia fortemente as teorias de preservação de calor geotérmico. Compreender a atividade histórica vulcânica marciana pode revelar insights sobre a evolução planetária precoce da própria Terra. Relatórios minerais geoquímicos completos enviados para o arquivo.",
    location: "Base de Valles Marineris, Marte",
    role: "Cientista Cidadão"
  },
  'post-4': {
    content: "Acabei de terminar a caminhada de manutenção EV para alinhar os rastreadores de painéis solares no lado bombordo da Estação Alpha. A eficiência das células solares em tempo real saltou para 96,5% sob raios limpos. Fornecendo energia elétrica de emissão zero para nossos módulos de simulação ambiental, geradores de suporte à vida e matriz de comunicação do espaço profundo. Um ótimo exemplo de infraestrutura verde.",
    location: "Painéis Solares Beta da EEI",
    role: "Engenheiro Chefe"
  }
};

const ROLE_MAP: Record<string, string> = {
  'Commander': 'Comandante',
  'Citizen Scientist': 'Cientista Cidadão',
  'Mission Control': 'Controle de Missão',
  'Chief Engineer': 'Engenheiro Chefe',
  'Climate Analyst': 'Analista de Clima'
};

const SDG_TRANSLATIONS: Record<string, string> = {
  'SDG 13: Climate Action': 'ODS 13: Ação Climática',
  'SDG 15: Life on Land': 'ODS 15: Vida Terrestre',
  'SDG 9: Industry & Innovation': 'ODS 9: Indústria e Inovação',
  'SDG 6: Clean Water': 'ODS 6: Água Potável',
  'SDG 7: Affordable & Clean Energy': 'ODS 7: Energia Limpa e Acessível'
};

const COMMENT_TRANSLATIONS: Record<string, string> = {
  'comment-2-1': 'Análise fascinante! Mostra como o monitoramento orbital pode proteger diretamente as comunidades terrestres vulneráveis.',
  'comment-3-1': 'Esta composição química se alinha perfeitamente com o mapeamento geológico das encostas do Olympus Mons. Excelente descoberta, Aris!'
};

interface PostComponentProps {
  post: Post;
  onLike: (postId: string) => void;
  onAddComment: (postId: string, commentAuthor: string, commentContent: string) => void;
  language?: 'EN' | 'PT';
}

export const PostComponent: React.FC<PostComponentProps> = ({
  post,
  onLike,
  onAddComment,
  language = 'EN'
}) => {
  const [commentOpen, setCommentOpen] = useState<boolean>(false);
  const [newCommentText, setNewCommentText] = useState<string>('');
  const [authorName, setAuthorName] = useState<string>('');

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onLike(post.id);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const commenterName = authorName.trim() || 'Citizen Scientist Echo';
    onAddComment(post.id, commenterName, newCommentText.trim());
    setNewCommentText('');
    setAuthorName('');
  };

  const isPt = language === 'PT';
  const translation = isPt ? POST_TRANSLATIONS[post.id] : null;

  const content = translation?.content || post.content;
  const location = translation?.location || post.location;
  const imageLabel = translation?.imageLabel || post.imageLabel;
  const role = translation?.role || (isPt ? (ROLE_MAP[post.role] || post.role) : post.role);

  return (
    <article 
      role="article"
      aria-labelledby={`post-author-${post.id}`}
      className="rounded-2xl overflow-hidden group glass-card hover:border-primary-container/40 transition-all duration-300 shadow-[0_0_15px_rgba(0,242,255,0.02)]"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-primary/30 flex-shrink-0">
              <img 
                alt={`${post.author} Profile`} 
                className="w-full h-full object-cover" 
                src={post.avatar}
              />
            </div>
            <div>
              <div className="flex items-center flex-wrap gap-2">
                <h3 id={`post-author-${post.id}`} className="font-bold text-on-surface text-base">
                  {post.author}
                </h3>
                <span className="px-2 py-0.5 bg-secondary-container/20 text-secondary text-[10px] rounded border border-secondary/20 font-label-caps uppercase select-none">
                  {role}
                </span>
                {post.altitude && (
                  <span className="px-2 py-0.5 bg-primary-container/10 text-primary-container text-[10px] rounded border border-primary-container/10 font-mono select-none">
                    {post.altitude} KM Alt
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-on-surface-variant text-xs mt-0.5 opacity-80">
                <span className="material-symbols-outlined text-[14px]">location_on</span>
                <span>{location}</span>
                <span className="text-[10px] opacity-50">•</span>
                <span className="font-mono text-[10px]">{post.date}</span>
              </div>
            </div>
          </div>
          
          {/* SDG Goal Badges */}
          <div className="flex flex-col gap-1 items-end">
            {post.sdgTags.map((tag, tIdx) => {
              const displayTag = isPt ? (SDG_TRANSLATIONS[tag] || tag) : tag;
              return (
                <span 
                  key={tIdx} 
                  className={`px-2 py-0.5 text-[10px] font-mono rounded border ${
                      tag.includes('13') 
                      ? 'bg-rose-950/40 text-rose-300 border-rose-500/20' 
                      : 'bg-emerald-950/40 text-emerald-300 border-emerald-500/20'
                    }`}
                >
                  {displayTag}
                </span>
              );
            })}
          </div>
        </div>

        {/* Content Paragraph */}
        <p className="text-on-surface-variant mb-6 text-sm md:text-base leading-relaxed whitespace-pre-line">
          {content}
        </p>

        {/* Image Attachment (If present) */}
        {post.image && (
          <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 mb-4 bg-background/40">
            <img 
              alt={imageLabel || "Orbital Imagery Upload"} 
              className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-700" 
              src={post.image}
            />
            {imageLabel && (
              <div className="absolute bottom-3 right-3 bg-background/80 border border-white/10 px-2.5 py-1 rounded text-[10px] text-white font-mono uppercase tracking-wider backdrop-blur-md">
                {imageLabel}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Footer Bar */}
      <footer className="px-6 py-4 border-t border-white/10 bg-white/2 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Like Counter */}
            <button 
              onClick={handleLikeClick}
              aria-label={post.likedByMe ? "Unlike post" : "Like post"}
              className={`flex items-center gap-2 text-xs md:text-sm font-medium transition-colors ${
                post.likedByMe ? 'text-primary scale-102 font-semibold' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <span className={`material-symbols-outlined transition-all ${post.likedByMe ? 'fill-current text-primary' : ''}`}>
                favorite
              </span>
              <span className="font-mono tracking-wider">{post.likes}</span>
            </button>

            {/* Comment Counter / Toggle */}
            <button 
              onClick={() => setCommentOpen(!commentOpen)}
              aria-expanded={commentOpen}
              aria-label="Toggle comments panel"
              className={`flex items-center gap-2 text-xs md:text-sm text-on-surface-variant hover:text-primary transition-colors ${
                commentOpen ? 'text-primary' : ''
              }`}
            >
              <span className="material-symbols-outlined">mode_comment</span>
              <span className="font-mono tracking-wider">{post.comments?.length || 0}</span>
            </button>

            {/* Simulated Share Trigger */}
            <button 
              onClick={() => {
                const alertMsg = language === 'EN'
                  ? `Geospatial data packet generated:\n${post.author} [${location}]\n\nLink ready to broadcast to terrestrial servers!`
                  : `Pacote de dados geoespaciais gerado:\n${post.author} [${location}]\n\nLink pronto para ser transmitido aos servidores terrestres!`;
                alert(alertMsg);
              }}
              aria-label="Share planetary broadcast"
              className="flex items-center gap-2 text-xs md:text-sm text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined">share</span>
              <span className="hidden sm:inline font-mono text-[11px] uppercase tracking-wider">
                {language === 'EN' ? 'Broadcast' : 'Transmitir'}
              </span>
            </button>
          </div>

          <button 
            onClick={() => {
              const archiveMsg = language === 'EN'
                ? 'Post pinned to terrestrial mission archives successfully!'
                : 'Post fixado nos arquivos de missões terrestres com sucesso!';
              alert(archiveMsg);
            }}
            aria-label="Bookmark metadata"
            className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors hover:scale-110 active:scale-95"
          >
            bookmark
          </button>
        </div>

        {/* Comment Thread Body */}
        {commentOpen && (
          <div className="border-t border-white/5 pt-4 mt-2">
            <h4 className="text-xs font-label-caps text-primary uppercase tracking-wider mb-3">
              {language === 'EN' ? 'Transmission Logs' : 'Logs de Transmissão'} ({post.comments?.length || 0})
            </h4>
            
            {/* List of comments */}
            <div className="space-y-4 max-h-[250px] overflow-y-auto mb-4 pr-1">
              {(!post.comments || post.comments.length === 0) ? (
                <p className="text-xs text-on-surface-variant opacity-60 italic font-mono pl-1">
                  {language === 'EN' 
                    ? 'No transmission logs detected. Send first broadcast from Earth below.' 
                    : 'Nenhum log de transmissão detectado. Envie a primeira mensagem da Terra abaixo.'}
                </p>
              ) : (
                post.comments.map(comment => {
                  const commentContent = isPt ? (COMMENT_TRANSLATIONS[comment.id] || comment.content) : comment.content;
                  return (
                    <div key={comment.id} className="flex gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
                      <div className="h-8 w-8 rounded-full overflow-hidden border border-primary/20 flex-shrink-0">
                        <img 
                          src={comment.avatar} 
                          alt={`${comment.author} avatar`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-primary">{comment.author}</span>
                          <span className="text-[9px] text-on-surface-variant font-mono">
                            {language === 'EN' ? comment.date : (
                              comment.date.includes('ago') ? comment.date.replace('ago', 'atrás') : comment.date
                            )}
                          </span>
                        </div>
                        <p className="text-xs text-on-surface-variant/90 mt-1 leading-relaxed">
                          {commentContent}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* New Comment Submission Form */}
            <form onSubmit={handleCommentSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input 
                  type="text" 
                  placeholder={language === 'EN' ? "Your Name / Call Sign..." : "Seu Nome / Indicativo..."} 
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="bg-white/5 border border-white/10 hover:border-white/20 focus:border-primary/50 text-xs text-on-surface rounded-lg p-2.5 focus:outline-none transition-colors"
                />
                <div className="sm:col-span-2">
                  <input 
                    type="text" 
                    placeholder={language === 'EN' ? "Contribute terrestrial reply..." : "Enviar resposta terrestre..."} 
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-primary/50 text-xs text-on-surface rounded-lg p-2.5 focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button 
                  type="submit" 
                  className="bg-primary/20 hover:bg-primary-container text-primary hover:text-on-primary-container px-4 py-2 rounded-lg font-mono text-[10px] font-bold uppercase tracking-wider transition-all disabled:opacity-50"
                  disabled={!newCommentText.trim()}
                >
                  {language === 'EN' ? 'Transmit Message' : 'Transmitir Mensagem'}
                </button>
              </div>
            </form>
          </div>
        )}
      </footer>
    </article>
  );
};
