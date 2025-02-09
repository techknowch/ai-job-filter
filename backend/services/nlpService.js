const natural = require('natural');
const { NLP } = require('node-nlp');
const tokenizer = new natural.WordTokenizer();
const nlp = new NLP();

class NLPService {
    // Tokenize and clean text
    preprocessText(text) {
        const tokens = tokenizer.tokenize(text.toLowerCase());
        return tokens.filter(token => token.length > 2);
    }

    // Extract keywords from text
    async extractKeywords(text) {
        const result = await nlp.process('en', text);
        return result.keywords;
    }

    // Calculate similarity score between job and resume
    calculateSimilarity(jobTokens, resumeTokens) {
        const tfidf = new natural.TfIdf();
        tfidf.addDocument(jobTokens);
        tfidf.addDocument(resumeTokens);

        let similarity = 0;
        jobTokens.forEach(token => {
            similarity += tfidf.tfidf(token, 0) * tfidf.tfidf(token, 1);
        });

        return similarity;
    }

    // Match job with resumes
    async findMatchingCandidates(job, resumes) {
        const jobTokens = this.preprocessText(job.description);
        const jobKeywords = await this.extractKeywords(job.description);

        return resumes.map(resume => {
            const resumeTokens = this.preprocessText(resume.content);
            const similarity = this.calculateSimilarity(jobTokens, resumeTokens);

            return {
                resumeId: resume._id,
                userId: resume.userId,
                score: similarity,
                matchedKeywords: jobKeywords.filter(keyword =>
                    resumeTokens.includes(keyword.toLowerCase())
                )
            };
        }).sort((a, b) => b.score - a.score);
    }

    // Match resume with jobs
    async findMatchingJobs(resume, jobs) {
        const resumeTokens = this.preprocessText(resume.content);
        const resumeKeywords = await this.extractKeywords(resume.content);

        return jobs.map(job => {
            const jobTokens = this.preprocessText(job.description);
            const similarity = this.calculateSimilarity(resumeTokens, jobTokens);

            return {
                jobId: job._id,
                title: job.title,
                company: job.company,
                score: similarity,
                matchedKeywords: resumeKeywords.filter(keyword =>
                    jobTokens.includes(keyword.toLowerCase())
                )
            };
        }).sort((a, b) => b.score - a.score);
    }
}

module.exports = new NLPService(); 