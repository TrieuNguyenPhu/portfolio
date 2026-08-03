import type { Language } from "../site-header";

export type Localized = Record<Language, string>;

export type BlogPost = {
  slug: string;
  title: Localized;
  excerpt: Localized;
  publishedAt: string;
  displayDate: Localized;
  readingTime: Localized;
  tags: string[];
  sections: { heading?: Localized; paragraphs: Localized[] }[];
};

const text = (en: string, vi: string): Localized => ({ en, vi });

// Thêm bài viết mới bằng cách sao chép một object và viết đủ nội dung EN/VI.
export const posts: BlogPost[] = [
  {
    slug: "bat-dau-voi-gitops",
    title: text(
      "Getting started with GitOps: from source changes to production",
      "Bắt đầu với GitOps: từ thay đổi mã nguồn đến production",
    ),
    excerpt: text(
      "How I structure a compact GitOps delivery flow that is verifiable and easy to roll back when incidents happen.",
      "Cách tôi tổ chức một luồng triển khai GitOps nhỏ gọn, có thể kiểm tra và dễ dàng quay lui khi có sự cố.",
    ),
    publishedAt: "2026-08-03",
    displayDate: text("August 3, 2026", "03 tháng 8, 2026"),
    readingTime: text("5 min read", "5 phút đọc"),
    tags: ["GitOps", "Kubernetes", "Argo CD"],
    sections: [
      {
        paragraphs: [
          text(
            "GitOps turns Git into the single source of truth for the system's desired state. Instead of deploying manually, every change goes through a commit, pull request, and a repeatable verification process.",
            "GitOps biến Git thành nguồn sự thật duy nhất cho trạng thái mong muốn của hệ thống. Thay vì triển khai thủ công, mọi thay đổi đều đi qua commit, pull request và một quy trình kiểm tra có thể lặp lại.",
          ),
          text(
            "In this first article, I document the minimal structure I use to deliver an application to Kubernetes with Argo CD.",
            "Trong bài viết đầu tiên này, tôi ghi lại cấu trúc tối giản mà mình thường dùng để đưa một ứng dụng lên Kubernetes bằng Argo CD.",
          ),
        ],
      },
      {
        heading: text("The deployment flow", "Luồng triển khai"),
        paragraphs: [
          text(
            "The source is tested and packaged as a container image in CI. The image is then scanned, signed, and pushed to a registry. The configuration repository is updated only after every check passes.",
            "Mã nguồn được kiểm tra và đóng gói thành container image trong CI. Image sau đó được quét lỗ hổng, ký số và đẩy lên registry. Repository cấu hình chỉ được cập nhật sau khi các bước kiểm tra hoàn tất.",
          ),
          text(
            "Argo CD detects the new version in the configuration repository, syncs the manifests to the cluster, and watches the rollout. If health metrics miss their thresholds, the previous version remains a clear and verifiable rollback path.",
            "Argo CD phát hiện phiên bản mới trong repository cấu hình, đồng bộ manifest vào cluster và theo dõi trạng thái rollout. Nếu chỉ số sức khỏe không đạt ngưỡng, phiên bản trước vẫn là đường lui rõ ràng và có thể kiểm chứng.",
          ),
        ],
      },
      {
        heading: text("What matters most", "Điều quan trọng nhất"),
        paragraphs: [
          text(
            "The tools are not the hardest part. The real value is a transparent change flow: who changed what, how it was verified, and how the system returns to a safe state.",
            "Công cụ không phải là phần khó nhất. Giá trị thực sự nằm ở một luồng thay đổi minh bạch: ai thay đổi, thay đổi điều gì, đã được kiểm tra ra sao và cách quay về trạng thái an toàn.",
          ),
        ],
      },
    ],
  },
];

export const getPost = (slug: string) => posts.find((post) => post.slug === slug);
