export interface PayloadMetadata {
    file_path: string;
    file_name: string;
    file_type: null | string; // Updated to allow for a string type as well, if needed.
    file_size: number;
    creation_date: string;
    last_modified_date: string;
    last_accessed_date: string;
  }
  
  export interface RelationshipInfo {
    class_name: string;
    hash: string;
    metadata: PayloadMetadata;
    node_id: string;
    node_type: string;
  }
  
  export interface Relationships {
    [key: string]: RelationshipInfo;
  }
  
  export interface NodeContent {
    class_name: string;
    embedding: null;
    end_char_idx: number;
    excluded_embed_metadata_keys: string[];
    excluded_llm_metadata_keys: string[];
    id_: string;
    metadata: PayloadMetadata;
    metadata_seperator: string;
    metadata_template: string;
    relationships: Relationships;
    start_char_idx: number;
    text: string;
    text_template: string;
  }
  
  export interface HitNode {
    id: string;
    payload: {
      _node_content: NodeContent;
      _node_type: string;
      creation_date: string;
      doc_id: string;
      document_id: string;
      file_name: string;
      file_path: string;
      file_size: number;
      file_type: null | string; // Updated to allow for a string type as well, if needed.
      last_accessed_date: string;
      last_modified_date: string;
      ref_doc_id: string;
    };
    score: number;
    shard_key: null;
    vector: null;
    version: number;
  }
  
  export interface QueryObject {
    answer: string;
    good_answer: null;
    good_hits: null;
    hit_nodes: HitNode[];
    id: string;
    question: string;
    question_embedding: string;
  }
  