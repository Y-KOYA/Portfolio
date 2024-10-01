# 概要
ポートフォリオのAPI仕様書

## APIリソース一覧
http://localhost:4000/api/v1/portfolio

## エンドポイント一覧
```
| メソッド | URI | 詳細 |
| GET | /api/v1/portfolio | ポートフォリオ内容の一覧 |
| PUT | /api/v1/portfolio/1 | 内容の編集 |
```

## データ形式
* JSON
* データ構造
```
{
  "id": <number>,　　<!-- id -->
  "profile": <string>,   <!-- 名前 -->
  "achievement": <string>,   <!-- 実績 -->
  "skill": <string>   <!-- スキル -->
}
```

## メソッドごとの設計
### ポートフォリオ内容の一覧表示
* エンドポイント:GET /api/v1/portfolio
* リクエスト:なし
* レスポンス:
　・ステータコード: 200 OK
　・データ形式: JSON
　・内容
```
[
  {
  "profile": 名前,   
  "achievement": 実績,
  "skill": スキル
}
]
```

### 内容の編集
* エンドポイント:PUT /api/v1/portfolio/put
* リクエスト:
```
{
  "profile": 名前,   
  "achievement": 実績,
  "skill": スキル
}
```
* レスポンス:
　・データ形式:JSON
　・内容
```
{
  "profile": 名前,   
  "achievement": 実績,
  "skill": スキル
}
```
